import { Body, Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { ContentDto } from './submodule/dtos/src/dto/content.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log("step 1")
    return this.appService.getHello();
  }

  @Post()
  async createContent(@Body()content: ContentDto){     // dtos -> data
     try{
       let createdContent = await this.appService.createContent(content);
       return createdContent;
     }
     catch(err){
       console.log(err);
       return err;
     } 
  }
}
