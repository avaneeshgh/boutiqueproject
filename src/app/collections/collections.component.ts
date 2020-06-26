import { ProductService } from "./../../../appservices/product.service";
import { Url } from "url";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-collections",
  templateUrl: "./collections.component.html",
  styleUrls: ["./collections.component.scss"],
})
export class CollectionsComponent implements OnInit {
  allCollections = [
    {
      name: "Anarkali Suits",
      image:
        "https://cdn.shopify.com/s/files/1/1105/1322/products/DustyPeachDesignerEmbroideredNetLehengaStyleAnarkaliSuit_16_-Saira_sBoutique.jpg?v=1592457202",
      dbname: "Anarkali+Suit",
      count: 0,
    },
    {
      name: "Lehengas",
      image:
        "https://cdn.shopify.com/s/files/1/1105/1322/products/PistaGreen_NavyBlueDesignerEmbroideredSilkWeddingLehenga_6_-Saira_sBoutique.jpg?v=1591938767",
      dbname: "Lehenga",
      count: 0,
    },
    {
      name: "Long Frocks",
      image:
        "https://cdn.shopify.com/s/files/1/1105/1322/products/SkyBlueDesignerEmbroideredSatinAnarkaliGown_8_-Saira_sBoutique.jpg?v=1584249005",
      dbname: "Long+Frock",
      count: 0,
    },
    {
      name: "Churidar Suits",
      image:
        "https://cdn.shopify.com/s/files/1/1105/1322/products/Maroon_Pink_Designer_Embroidered_Georgette_Churidar_Suit_9_-_Saira_s_Boutique.jpg?v=1583471417",
      dbname: "Salwar+Kameez-Churidar+Suit",
      count: 0,
    },
    {
      name: "Patiyala Suits",
      image:
        "https://cdn.shopify.com/s/files/1/1105/1322/products/Maroon_Red_Designer_Embroidered_Art_Silk_Party_Wear_Patiala_Suit_7_-_Saira_s_Boutique.png?v=1569301784",
      dbname: "Salwar+Kameez-Patiyala+Suit",
      count: 0,
    },
    {
      name: "Sharara Suits",
      image:
        "https://cdn.shopify.com/s/files/1/1105/1322/products/Cream_GoldDesignerEmbroideredJacquardShararaSuit_7_-Saira_sBoutique.jpg?v=1585026650",
      dbname: "Salwar+Kameez-Sharara+Suit",
      count: 0,
    },
    {
      name: "Palazzo Suits",
      image:
        "https://cdn.shopify.com/s/files/1/1105/1322/products/DustySageGreen_PinkDesignerEmbroideredPalazzoSuit_9_-Saira_sBoutique.jpg?v=1586840973",
      dbname: "Salwar+Kameez-Palazzo+Suit",
      count: 0,
    },
    {
      name: "Straight Suits",
      image:
        "https://cdn.shopify.com/s/files/1/1105/1322/products/Pista_Green_Designer_Embroidered_Net_Straight_Cut_Pant_Suit_7_-_Saira_s_Boutique.png?v=1566417303",
      dbname: "Salwar+Kameez-Straight+Suit",
      count: 0,
    },
    {
      name: "Pant Suits",
      image:
        "https://cdn.shopify.com/s/files/1/1105/1322/products/Powder_Blue_Yellow_Designer_Embroidered_Straight_Cut_Silk_Pant_Suit_11_-_Saira_s_Boutique_e67cad96-aefa-460f-8efd-3ba5fbe6fb48.jpg?v=1579151382",
      dbname: "Salwar+Kameez-Pant+Suit",
      count: 0,
    },
    {
      name: "Pattern Blouses",
      image:
        "https://i.pinimg.com/564x/d5/a6/70/d5a67032ae060c9f5edbfe2b6a7723ad.jpg",
      dbname: "Pattern+Blouse",
      count: 0,
    },
    {
      name: "Bridal Blouses",
      image:
        "https://i.pinimg.com/564x/b1/a9/92/b1a9929a1fb82ac4550d961108b1d950.jpg",
      dbname: "Bridal+Blouse",
      count: 0,
    },
    {
      name: "Boat Neck",
      image:
        "https://i.pinimg.com/564x/41/d8/fd/41d8fd977ba839cb7e27a94f4b78bd66.jpg",
      dbname: "Designer+Blouse-Boat+Neck",
      count: 0,
    },
    {
      name: "High Neck",
      image:
        "https://2.bp.blogspot.com/-rtRBPahsJZg/W8xtpjKwWUI/AAAAAAAALhU/LrA-M_cTk44O06yq4dqBbzujLg5DVrDAACLcBGAs/s1600/diwali%2Bblouse%2Bdesign%2B2018-8.jpg",
      dbname: "Designer+Blouse-High+Neck",
      count: 0,
    },
    {
      name: "Stand Collar",
      image:
        "https://i.pinimg.com/236x/3c/ff/41/3cff41b4c74bbbf956854b08346dd6e7.jpg",
      dbname: "Designer+Blouse-Stand+Collar",
      count: 0,
    },

    {
      name: "Halter Neck",
      image:
        "https://i.pinimg.com/564x/24/e7/d2/24e7d21a9cb952e24a4d9fdd79ab4684.jpg",
      dbname: "Designer+Blouse-Halter+Neck",
      count: 0,
    },
    {
      name: "Kids Wear",
      image:
        "https://i.pinimg.com/564x/e3/1a/12/e31a1243ce81e578bb40145200b6af53.jpg",
      dbname: "Kids+Wear",
      count: 0,
    },
    {
      name: "Crop Tops",
      image:
        "https://cdn1.ninecolours.com/image/cache/products-2018/July-2019/Youdesign-Georgette-Crop-Top-Lehenga-In-Blue-Colour-YD2672238-A-1200x1799.jpg",
      dbname: "Crop+Top",
      count: 0,
    },
  ];

  constructor(private productservice: ProductService) {}

  isLoading: boolean;
  ngOnInit() {
    this.isLoading = true;

    for (let i of this.allCollections) {
      this.productservice.getCount(i.dbname).subscribe((res) => {
        i.count = res.pcount;
      });
    }

    this.isLoading = false;
  }
}
