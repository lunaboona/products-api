import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  public async create(createProductDto: CreateProductDto): Promise<Product> {
    let product = new Product();
    product = { ...product, ...createProductDto };
    return await this.productRepository.save(product);
  }

  public async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  public async findOne(id: string): Promise<Product> {
    return await this.productRepository.findOneBy({ id });
  }

  public async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    let product = await this.findOne(id);
    if (!product) {
      throw new NotFoundException();
    }
    product = { ...product, ...updateProductDto };
    return await this.productRepository.save(product);
  }

  public async remove(id: string): Promise<void> {
    const product = await this.findOne(id);
    if (!product) {
      throw new NotFoundException();
    }
    await this.productRepository.delete(product);
    return;
  }
}
