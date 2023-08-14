import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../product.service';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
})
export class MainComponent implements OnInit {
  constructor(readonly productService: ProductService) {}

  ngOnInit(): void {
    this.getDogs();
  }

  productList: any;

  getDogs() {
    this.productService.getAllProducts().subscribe({
      next: (res) => {
        this.productList = res;
        console.log(this.productList);
      },
    });
  }
}
