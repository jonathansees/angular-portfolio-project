import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
// import { Observable } from 'rxjs';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  bookingList : AngularFireList<any>;

  dataSource;

  displayedColumns = ['title', 'price', 'category'];

  constructor(private firebase: AngularFireDatabase) { }

  async ngOnInit() {
   
    var packageBookingList = []; 

    this.bookingList = await this.firebase.list('/products');

    this.bookingList.query.orderByChild('startDate').limitToFirst(10);

    await this.bookingList.snapshotChanges().subscribe(item => {
      item.forEach(element => {
        var y = element.payload.toJSON();
        packageBookingList.push(y);
      })

      this.dataSource = new MatTableDataSource(packageBookingList.reverse());
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }
}
