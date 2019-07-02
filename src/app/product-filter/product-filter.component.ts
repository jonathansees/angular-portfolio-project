import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from '../category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent implements OnInit {
  brands$;
  @Input('brand') brand;

  constructor(categoryService: CategoryService) {
    this.brands$ = categoryService.getAll();
  }

  ngOnInit() {
  }

}
