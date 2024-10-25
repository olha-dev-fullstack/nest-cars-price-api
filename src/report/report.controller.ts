import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateReportDto } from './dto/createReport.dto';
import { ReportService } from './report.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/user/decorators/currentUser.decorator';
import { User } from 'src/user/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ReportDto } from './dto/report.dto';
import { ApproveReportDto } from './dto/approveReport.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { GetEstimateDto } from './dto/getEstimate.dto';

@Controller('report')
@UseGuards(AuthGuard)
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  @Serialize(ReportDto)
  public async createReport(
    @CurrentUser() user: User,
    @Body() body: CreateReportDto,
  ) {
    return this.reportService.create(body, user);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  public async approveReport(
    @Param('id') id: string,
    @Body() body: ApproveReportDto,
  ) {
    return this.reportService.changeApproval(id, body.approved);
  }

  @Get()
  public async getEstimate(@Query() query: GetEstimateDto) {
    return this.reportService.estimate(query)
  }
}
