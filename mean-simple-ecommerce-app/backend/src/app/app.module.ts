import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
@Module({
  imports: [
    AuthModule,
    UserModule,
    ProductModule,
    MongooseModule.forRoot('mongodb+srv://testUser:vk_3H9SpvkEB5@atlascluster.crxz8gj.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
