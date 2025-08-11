import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookingDto } from './booking.dto';
import {
  Booking,
  BookingConcernPerson,
  BookingPassenger,
  PassengerType,
} from './entities';
import {
  AdultAddon,
  ChildAddon,
  InfantAddon,
  Package,
  PackageFare,
  Slot,
  InstallmentPlan,
  AdultInstallmentValue,
  ChildInstallmentValue,
  InfantInstallmentValue,
} from 'src/packages/entities';

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
    @InjectRepository(InstallmentPlan)
    private installmentPlanRepository: Repository<InstallmentPlan>,
    @InjectRepository(AdultInstallmentValue)
    private adultInstallmentValueRepository: Repository<AdultInstallmentValue>,
    @InjectRepository(ChildInstallmentValue)
    private childInstallmentValueRepository: Repository<ChildInstallmentValue>,
    @InjectRepository(InfantInstallmentValue)
    private infantInstallmentValueRepository: Repository<InfantInstallmentValue>,
  ) {}

  async createBooking(createBookingDto: CreateBookingDto): Promise<Booking> {
    const {
      packageId,
      slotId,
      concernPerson,
      passengers,
      specialInstructions,
      notes,
      discountAmount,
      discountRemarks,
    } = createBookingDto;

    // Validate package exists
    const packageEntity = await this.packageRepository.findOne({
      where: { id: packageId },
    });
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
      where: { packageId, slotId },
    });
    if (!packageFare) {
      throw new BadRequestException(
        `No fare configuration found for package ${packageId} and slot ${slotId}`,
      );
    }

    // Calculate total amount based on passengers and their addons
    let totalAmount = 0;
    let totalAddonAmount = 0;

    // Fetch all addons for this package-slot
    const adultAddons = await this.adultAddonRepository.find({
      where: { packageId, slotId },
    });
    const childAddons = await this.childAddonRepository.find({
      where: { packageId, slotId },
    });
    const infantAddons = await this.infantAddonRepository.find({
      where: { packageId, slotId },
    });

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

      // Add addon costs - assuming addonIds represent addon types
      if (passenger.adultAddonIds && passenger.adultAddonIds.length > 0) {

        const adultAddonTotal = adultAddons.reduce(
          (sum, addon) => sum + Number(addon.fare),
          0,
        );
        totalAmount += adultAddonTotal;
        totalAddonAmount += adultAddonTotal;
      }

      if (passenger.childAddonIds && passenger.childAddonIds.length > 0) {
        const childAddonTotal = childAddons.reduce(
          (sum, addon) => sum + Number(addon.fare),
          0,
        );
        totalAmount += childAddonTotal;
        totalAddonAmount += childAddonTotal;
      }

      if (passenger.infantAddonIds && passenger.infantAddonIds.length > 0) {
        const infantAddonTotal = infantAddons.reduce(
          (sum, addon) => sum + Number(addon.fare),
          0,
        );
        totalAmount += infantAddonTotal;
        totalAddonAmount += infantAddonTotal;
      }
    }

    // Handle concern person - check if exists by email or phone
    let existingConcernPerson = await this.concernPersonRepository.findOne({
      where: [{ email: concernPerson.email }, { phone: concernPerson.phone }],
    });

    let concernPersonId: number;

    // Create or connect concern person
    if (existingConcernPerson) {
      // Use existing concern person
      concernPersonId = existingConcernPerson.id;
    } else {
      // Create new concern person
      const newConcernPerson = this.concernPersonRepository.create({
        name: concernPerson.name,
        email: concernPerson.email,
        phone: concernPerson.phone,
        address: concernPerson.address,
      });

      const savedConcernPerson =
        await this.concernPersonRepository.save(newConcernPerson);
      concernPersonId = savedConcernPerson.id;
    }

    // Create booking with concern person reference
    const booking = this.bookingRepository.create({
      packageId,
      slotId,
      concernPersonId,
      totalAmount,
      totalAddonAmount,
      discountAmount,
      discountRemarks,
      pendingAmount: totalAmount,
      specialInstructions,
      notes,
    });

    const savedBooking = await this.bookingRepository.save(booking);

    // Create passengers
    for (const passengerData of passengers) {
      const passenger = this.passengerRepository.create({
        bookingId: (savedBooking as Booking).id,
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
        pickupPoint: passengerData.pickupPoint,
      });

      const savedPassenger = await this.passengerRepository.save(passenger);

      // Handle addon relationships
      if (
        passengerData.adultAddonIds &&
        passengerData.adultAddonIds.length > 0
      ) {
        const adultAddons = await this.adultAddonRepository.find({
          where: { packageId, slotId },
        });
        savedPassenger.adultAddons = adultAddons;
        await this.passengerRepository.save(savedPassenger);
      }

      if (
        passengerData.childAddonIds &&
        passengerData.childAddonIds.length > 0
      ) {
        const childAddons = await this.childAddonRepository.find({
          where: { packageId, slotId },
        });
        savedPassenger.childAddons = childAddons;
        await this.passengerRepository.save(savedPassenger);
      }

      if (
        passengerData.infantAddonIds &&
        passengerData.infantAddonIds.length > 0
      ) {
        const infantAddons = await this.infantAddonRepository.find({
          where: { packageId, slotId },
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
        'passengers.infantAddons',
      ],
    });

    if (!bookingWithRelations) {
      throw new NotFoundException('Booking not found after creation');
    }

    return bookingWithRelations;
  }

  async getBookingFareDetails(id: number): Promise<any> {
    // Find booking with all relations
    const booking = await this.bookingRepository.findOne({
      where: { id },
      relations: [
        'package',
        'slot',
        'concernPerson',
        'passengers',
        'passengers.adultAddons',
        'passengers.childAddons',
        'passengers.infantAddons',
        'payments',
      ],
    });

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    // Get package fare for this booking
    const packageFare = await this.packageFareRepository.findOne({
      where: { packageId: booking.packageId, slotId: booking.slotId },
      relations: [
        'installmentPlan',
        'installmentPlan.adultValues',
        'installmentPlan.childValues',
        'installmentPlan.infantValues',
      ],
    });

    if (!packageFare) {
      throw new NotFoundException(
        `Package fare not found for package ${booking.packageId} and slot ${booking.slotId}`,
      );
    }

    let fullFare = 0;
    let firstInstallment = 0;
    let secondInstallment = 0;
    let thirdInstallment = 0;

    let totalAddonAmount = 0;

    for (const passenger of booking.passengers) {
      switch (passenger.type) {
        case PassengerType.ADULT:
          fullFare += Number(packageFare.adultFare);
          firstInstallment += Number(
            packageFare.installmentPlan?.adultValues?.[0]
              ?.firstInstallmentAmount || 0,
          );
          secondInstallment += Number(
            packageFare.installmentPlan?.adultValues?.[0]
              ?.secondInstallmentAmount || 0,
          );
          thirdInstallment += Number(
            packageFare.installmentPlan?.adultValues?.[0]
              ?.thirdInstallmentAmount || 0,
          );
          for (const addon of passenger.adultAddons) {
            totalAddonAmount += Number(addon.fare);
          }
          break;

        case PassengerType.CHILD:
          fullFare += Number(packageFare.childFare);
          firstInstallment += Number(
            packageFare.installmentPlan?.childValues?.[0]
              ?.firstInstallmentAmount || 0,
          );
          secondInstallment += Number(
            packageFare.installmentPlan?.childValues?.[0]
              ?.secondInstallmentAmount || 0,
          );
          thirdInstallment += Number(
            packageFare.installmentPlan?.childValues?.[0]
              ?.thirdInstallmentAmount || 0,
          );
          for (const addon of passenger.childAddons) {
            totalAddonAmount += Number(addon.fare);
          }
          break;

        case PassengerType.INFANT:
          fullFare += Number(packageFare.infantFare);
          firstInstallment += Number(
            packageFare.installmentPlan?.infantValues?.[0]
              ?.firstInstallmentAmount || 0,
          );
          secondInstallment += Number(
            packageFare.installmentPlan?.infantValues?.[0]
              ?.secondInstallmentAmount || 0,
          );
          thirdInstallment += Number(
            packageFare.installmentPlan?.infantValues?.[0]
              ?.thirdInstallmentAmount || 0,
          );
          for (const addon of passenger.infantAddons) {
            totalAddonAmount += Number(addon.fare);
          }
          break;
      }
    }

    thirdInstallment += totalAddonAmount - booking.discountAmount || 0;

    return {
      bookingId: booking.id,
      fullFare: fullFare,
      firstInstallment: firstInstallment,
      secondInstallment: secondInstallment,
      thirdInstallment: thirdInstallment,
    };
  }
}
