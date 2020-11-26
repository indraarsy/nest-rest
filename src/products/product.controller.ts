import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ProductService } from "./product.service";

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    addProduct(
        @Body('title') prodTitle: string,
        @Body('desc') prodDesc: string,
        @Body('price') prodPrice: number,
    ) {
        const generatedId = this.productService.insertProduct(
            prodTitle, 
            prodDesc, 
            prodPrice
        );
        return { id: generatedId }
    }

    @Get()
    getAllProducts() {
        return {product: this.productService.getProducts()};
    }

    @Get(':id')
    getProduct(@Param('id') prodId: string) {
        return this.productService.getProduct(prodId);
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
    deleteProduct(@Param('id') prodId: string) {
        this.productService.deleteProduct(prodId);
        return { message: 'Success Delete Product' };
    }

}