import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dto/createReport.dto';
import { User } from '../user/user.entity';
import { GetEstimateDto } from './dto/getEstimate.dto';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
  ) {}

  public async create(reportData: CreateReportDto, user: User) {
    const report = await this.reportRepository.create(reportData);
    report.user = user;
    return this.reportRepository.save(report);
  }

  public async changeApproval(id: string, approved: boolean) {
    const report = await this.reportRepository.findOne({
      where: { id: parseInt(id) },
    });
    if (!report) {
      throw new NotFoundException('report not found');
    }
    report.approved = approved;
    return this.reportRepository.save(report);
  }

  public async estimate(query: GetEstimateDto) {
    return this.reportRepository
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('make = :make', { make: query.make })
      .andWhere('model = :model', { model: query.model })
      .andWhere('lng - :lng BETWEEN -5 AND 5', { lng: query.lng })
      .andWhere('lat - :lat BETWEEN -5 AND 5', { lat: query.lat })
      .andWhere('year - :year BETWEEN -3 AND 3', { year: query.year })
      .andWhere('approved IS TRUE')
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .setParameters({ mileage: query.mileage })
      .limit(3)
      .getRawOne();
  }
}
