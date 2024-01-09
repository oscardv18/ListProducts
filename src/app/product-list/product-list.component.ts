import { Component, OnInit } from '@angular/core';
import { ProductsDataService } from '../products-data.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  data: any = { results: [] };
  productosFiltrados: any[] = [];
  marcasUnicas: Set<string> = new Set();

  constructor(private productsData: ProductsDataService) {}

  ngOnInit() {
    this.productsData.getData().subscribe((response) => {
      this.data = response;

      // Obtén marcas únicas y conviértelas en un conjunto
      this.marcasUnicas = new Set(
        this.data.results.map((producto: any) => producto.brand)
      );

      // Al iniciar, muestra todos los productos
      this.productosFiltrados = this.data.results;
    });
  }

  filtrarPorMarca(marca: string) {
    if (marca) {
      // Filtra los productos por la marca seleccionada
      this.productosFiltrados = this.data.results.filter(
        (producto: any) => producto.brand === marca
      );
    } else {
      // Si no se proporciona una marca, muestra todos los productos
      this.productosFiltrados = this.data.results;
    }
  }

  roundedStock(stock: number): number {
    return Math.floor(stock);
  }

  quitarFiltro() {
    this.productosFiltrados = this.data?.results || [];
  }
}
