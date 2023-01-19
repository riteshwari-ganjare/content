import { Module } from "@nestjs/common";
import ContentController from "./content.controller";

@Module({
    imports: [
        // TypeOrmModule.forFeature([User, Content])
      ],
      controllers: [ContentController],
      providers: [],
})
export class ContentModule {}

