import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';

import { Product } from './product.model';

@Injectable()
export class ProductService {
    private products: Product[] = [];

    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}

    async insertProduct(title:string, desc: string, price: number) {
        const newProduct = new this.productModel({
            title: title,
            description: desc,
            price: price
        });
        const result = await newProduct.save();
        console.log(result);
        return result.id as string;
    }

    async getProducts() {
        const products = await this.productModel.find().exec();
        return products.map((prod) => ({
            id: prod.id,
            title: prod.title,
            description: prod.description,
            price: prod.price
        }));
    }

    async getProduct(prodId: string) {
        const product = await this.findProduct(prodId);
        return product;
    }

    updateProduct(prodId: string, title:string, desc: string, price: number) {
        // const [product, index] = this.findProduct(prodId)
        // const updatedProduct = {...product};
        // if (title) {
        //     updatedProduct.title = title;
        // }
        // if (desc) {
        //     updatedProduct.description = desc;
        // }
        // if (price) {
        //     updatedProduct.price = price;
        // }
        // this.products[index] = updatedProduct;
    }

    async deleteProduct(prodId: string) {
        let product;
        try {
            product = await this.productModel.deleteOne({ _id: prodId })
        } catch (error) {
            throw new NotFoundException('Could not find product.');
        }
        return product;
    }

    private async findProduct(id: string): Promise<Product> {
        let product;
        try {
            product = await this.productModel.findById(id)
        } catch (error) {
            throw new NotFoundException('Could not find product.');
        }
        return product;
    }
}