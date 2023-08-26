import { Component } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';

import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { map } from 'rxjs';

import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  standalone: true,
  providers:[ProductService],
  imports: [CommonModule, ProductCardComponent, AsyncPipe],
})
export class MainPageComponent {
  
  //у відповіді отримуєм масив об'єктів тому викристовуєм ще pipe map 
  products$ = this.productService.getAllProducts().pipe(
    map((res) => res.data.getAllProducts)
  );

  constructor(private readonly productService: ProductService) {}
}