import { Component, OnInit, Input } from "@angular/core";
import { Url } from "url";

@Component({
  selector: "app-category-card",
  templateUrl: "./category-card.component.html",
  styleUrls: ["./category-card.component.scss"],
})
export class CategoryCardComponent implements OnInit {
  @Input() collection: any;

  count: number;

  constructor() {}

  ngOnInit() {}
}
