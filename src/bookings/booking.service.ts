import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Package, Slot, PackageFare, AdultAddon, ChildAddon, InfantAddon } from '../packages/packages.entity';
import { CreateBookingDto } from './booking.dto';
import { Booking, BookingConcernPerson, BookingPassenger, PassengerType } from './entities';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    @InjectRepository(BookingConcernPerson)
    private concernPersonRepository: Repository<BookingConcernPerson>,
    @InjectRepository(BookingPassenger)
    private passengerRepository: Repository<BookingPassenger>,
    @InjectRepository(Package)
    private packageRepository: Repository<Package>,
    @InjectRepository(Slot)
    private slotRepository: Repository<Slot>,
    @InjectRepository(PackageFare)
    private packageFareRepository: Repository<PackageFare>,
    @InjectRepository(AdultAddon)
    private adultAddonRepository: Repository<AdultAddon>,
    @InjectRepository(ChildAddon)
    private childAddonRepository: Repository<ChildAddon>,
    @InjectRepository(InfantAddon)
    private infantAddonRepository: Repository<InfantAddon>,
  ) {}

  async createBooking(createBookingDto: CreateBookingDto): Promise<Booking> {
    const { packageId, slotId, concernPerson, passengers, specialInstructions, notes } = createBookingDto;

    // Validate package exists
    const packageEntity = await this.packageRepository.findOne({ where: { id: packageId } });
    if (!packageEntity) {
      throw new NotFoundException(`Package with ID ${packageId} not found`);
    }

    // Validate slot exists
    const slot = await this.slotRepository.findOne({ where: { id: slotId } });
    if (!slot) {
      throw new NotFoundException(`Slot with ID ${slotId} not found`);
    }

    // Validate package fare exists for this package-slot combination
    const packageFare = await this.packageFareRepository.findOne({
      where: { packageId, slotId }
    });
    if (!packageFare) {
      throw new BadRequestException(`No fare configuration found for package ${packageId} and slot ${slotId}`);
    }

    // Calculate total amount based on passengers and their addons
    let totalAmount = 0;
    for (const passenger of passengers) {
      // Add base fare based on passenger type
      switch (passenger.type) {
        case PassengerType.ADULT:
          totalAmount += Number(packageFare.adultFare);
          break;
        case PassengerType.CHILD:
          totalAmount += Number(packageFare.childFare);
          break;
        case PassengerType.INFANT:
          totalAmount += Number(packageFare.infantFare);
          break;
      }

      // Add addon costs
      if (passenger.adultAddonIds && passenger.adultAddonIds.length > 0) {
        const adultAddons = await this.adultAddonRepository.find({
          where: { packageId, slotId }
        });
        totalAmount += adultAddons.reduce((sum, addon) => sum + Number(addon.fare), 0);
      }

      if (passenger.childAddonIds && passenger.childAddonIds.length > 0) {
        const childAddons = await this.childAddonRepository.find({
          where: { packageId, slotId }
        });
        totalAmount += childAddons.reduce((sum, addon) => sum + Number(addon.fare), 0);
      }

      if (passenger.infantAddonIds && passenger.infantAddonIds.length > 0) {
        const infantAddons = await this.infantAddonRepository.find({
          where: { packageId, slotId }
        });
        totalAmount += infantAddons.reduce((sum, addon) => sum + Number(addon.fare), 0);
      }
    }

    // Handle concern person - check if exists by email or phone
    let existingConcernPerson = await this.concernPersonRepository.findOne({
      where: [
        { email: concernPerson.email },
        { phone: concernPerson.phone }
      ]
    });

    if (existingConcernPerson) {
      throw new BadRequestException(`A concern person with email ${concernPerson.email} or phone ${concernPerson.phone} already exists`);
    }

    // Create booking
    const booking = this.bookingRepository.create({
      packageId,
      slotId,
      totalAmount,
      pendingAmount: totalAmount,
      specialInstructions,
      notes
    });

    const savedBooking = await this.bookingRepository.save(booking);

    // Create concern person
    const newConcernPerson = this.concernPersonRepository.create({
      bookingId: savedBooking.id,
      name: concernPerson.name,
      email: concernPerson.email,
      phone: concernPerson.phone,
      address: concernPerson.address
    });

    await this.concernPersonRepository.save(newConcernPerson);

    // Create passengers
    for (const passengerData of passengers) {
      const passenger = this.passengerRepository.create({
        bookingId: savedBooking.id,
        email: passengerData.email,
        phone: passengerData.phone,
        type: passengerData.type,
        firstName: passengerData.firstName,
        lastName: passengerData.lastName,
        dateOfBirth: new Date(passengerData.dateOfBirth),
        gender: passengerData.gender,
        passportNumber: passengerData.passportNumber,
        passportScanUrl: passengerData.passportScanUrl,
        tShirtSize: passengerData.tShirtSize,
        foodRestrictions: passengerData.foodRestrictions,
        specialInstructions: passengerData.specialInstructions,
        sicknessInformation: passengerData.sicknessInformation,
        pickupPoint: passengerData.pickupPoint
      });

      const savedPassenger = await this.passengerRepository.save(passenger);

      // Handle addon relationships
      if (passengerData.adultAddonIds && passengerData.adultAddonIds.length > 0) {
        const adultAddons = await this.adultAddonRepository.find({
          where: { packageId, slotId }
        });
        savedPassenger.adultAddons = adultAddons;
        await this.passengerRepository.save(savedPassenger);
      }

      if (passengerData.childAddonIds && passengerData.childAddonIds.length > 0) {
        const childAddons = await this.childAddonRepository.find({
          where: { packageId, slotId }
        });
        savedPassenger.childAddons = childAddons;
        await this.passengerRepository.save(savedPassenger);
      }

      if (passengerData.infantAddonIds && passengerData.infantAddonIds.length > 0) {
        const infantAddons = await this.infantAddonRepository.find({
          where: { packageId, slotId }
        });
        savedPassenger.infantAddons = infantAddons;
        await this.passengerRepository.save(savedPassenger);
      }
    }

    // Return booking with relations
    const bookingWithRelations = await this.bookingRepository.findOne({
      where: { id: savedBooking.id },
      relations: [
        'package',
        'slot',
        'concernPerson',
        'passengers',
        'passengers.adultAddons',
        'passengers.childAddons',
        'passengers.infantAddons'
      ]
    });

    if (!bookingWithRelations) {
      throw new NotFoundException('Booking not found after creation');
    }

    return bookingWithRelations;
  }
}
