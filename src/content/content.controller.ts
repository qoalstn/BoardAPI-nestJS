import { Controller, Get } from '@nestjs/common';
import { ContentService } from './content.service';

@Controller()
export class ContentController {
  constructor(private readonly appService: ContentService) {}


}
