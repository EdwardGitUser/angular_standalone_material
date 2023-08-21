import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GraphQLService {
  constructor(private apollo: Apollo) {}

  getAllProducts(): Observable<any> {
    return this.apollo.watchQuery({
      query: gql`
        query {
          getAllProducts {
            id
            name
            ownerName
            description
            longDescription
            photoUrl
            location
          }
        }
      `,
    }).valueChanges;
  }
}
