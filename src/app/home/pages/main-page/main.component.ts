import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/core/services/product.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

import { GraphQLService } from 'src/app/core/services/graphql.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
})
export class MainPageComponent implements OnInit {
  productList: any;
  constructor(readonly productService: ProductService,private graphqlService: GraphQLService) {}

  ngOnInit(): void {
    this.getDogs();
  }

  getDogs() {
    this.graphqlService.getAllProducts().subscribe({
      next: (res) => {
        this.productList = res.data.getAllProducts;
        console.log(this.productList);
      },
    });
  }
}