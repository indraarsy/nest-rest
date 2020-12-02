import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ProductService } from "./product.service";

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    async addProduct(
        @Body('title') prodTitle: string,
        @Body('desc') prodDesc: string,
        @Body('price') prodPrice: number,
    ) {
        const generatedId = await this.productService.insertProduct(
            prodTitle, 
            prodDesc, 
            prodPrice
        );
        return { id: generatedId }
    }

    @Get()
    async getAllProducts() {
        const products = await this.productService.getProducts();
        return { products: products };
    }

    @Get(':id')
    async getProduct(@Param('id') prodId: string) {
        const product = await this.productService.getProduct(prodId);
        return product;
    }

    @Patch(':id')
    updateProduct(
        @Param('id') prodId: string,
        @Body('title') prodTitle: string,
        @Body('desc') prodDesc: string,
        @Body('price') prodPrice: number,
    ) {
        this.productService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
        return { message: 'Success Update Product' };
    }

    @Delete(':id')
    async deleteProduct(@Param('id') prodId: string) {
        await this.productService.deleteProduct(prodId);
        return { message: 'Success Delete Product' };
    }

}