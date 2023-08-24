import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private apollo: Apollo) {}

  getAllProducts(): Observable<any> {
    return this.apollo.watchQuery({
      query: gql`
        query {
          getAllProducts {
            id
            name
            description
            photoUrl
            price
          }
        }
      `,
    }).valueChanges;
  }
}
