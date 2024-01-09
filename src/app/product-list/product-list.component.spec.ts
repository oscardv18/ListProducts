import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { ProductsDataService } from '../products-data.service';
import { of } from 'rxjs';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productsDataService: ProductsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      providers: [ProductsDataService],
    });
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    productsDataService = TestBed.inject(ProductsDataService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize productosFiltrados with all products', () => {
    // Arrange
    const testData = { results: [{ brand: 'Brand1' }, { brand: 'Brand2' }] };
    spyOn(productsDataService, 'getData').and.returnValue(of(testData));

    // Act
    component.ngOnInit();

    // Assert
    expect(component.productosFiltrados).toEqual(testData.results);
  });

  it('should filter products by brand', () => {
    // Arrange
    const testData = { results: [{ brand: 'Brand1' }, { brand: 'Brand2' }] };
    spyOn(productsDataService, 'getData').and.returnValue(of(testData));
    component.ngOnInit();

    // Act
    component.filtrarPorMarca('Brand1');

    // Assert
    expect(component.productosFiltrados.length).toBe(1);
    expect(component.productosFiltrados[0].brand).toBe('Brand1');
  });

  it('should reset productosFiltrados when quitarFiltro is called', () => {
    // Arrange
    const testData = { results: [{ brand: 'Brand1' }, { brand: 'Brand2' }] };
    spyOn(productsDataService, 'getData').and.returnValue(of(testData));
    component.ngOnInit();

    // Act
    component.filtrarPorMarca('Brand1');
    component.quitarFiltro();

    // Assert
    expect(component.productosFiltrados).toEqual(testData.results);
  });
});
