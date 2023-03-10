import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import 'dotenv/config.js';
import * as fs from 'fs';
import { Product } from './products/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.TYPEORM_CONNECTION as any,
      host: process.env.TYPEORM_HOST,
      port: Number(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
      logging: process.env.TYPEORM_LOGGING === 'true',
      ssl: {
        ca: fs.readFileSync(process.env.SSL_CERT_PATH).toString(),
      },
      entities: [Product],
      subscribers: [],
      migrations: [],
    }),
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
