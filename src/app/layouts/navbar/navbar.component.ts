import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FlowbiteService } from '../../core/services/flowbite.service';
import { Dropdown, initFlowbite } from 'flowbite';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from '../../core/auth/services/auth.service';
import { MystorageService } from '../../core/services/mystorage.service';
import { CartService } from '../../core/services/cart.service';
import { WishListService } from '../../core/services/wish-list.service';
import { CartInLocalStorageService } from '../../core/services/cart-in-local-storage.service';
import { CategoriesService } from '../../core/services/categories.service';
import { FormsModule } from '@angular/forms';
import { GuestWishListService } from '../../core/services/guest-wish-list.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  constructor(private flowbiteService: FlowbiteService) { }
  private readonly authService = inject(AuthService)
  private readonly mystorageService = inject(MystorageService)
  private readonly cartService = inject(CartService)
  private readonly categoriesService = inject(CategoriesService)
  private readonly wishListService = inject(WishListService)
  private readonly router = inject(Router)
  private readonly cartInLocalStorageService = inject(CartInLocalStorageService)
  private readonly guestWishListService = inject(GuestWishListService)
  loadingCategories = signal<boolean>(false)
  searchValue = signal<string>('')
  categoriesList = signal<Icategory[]>([])


  isLogged = computed<boolean>(() => this.authService.isLogged())
  favorateItemsCount = computed<number>(() => this.wishListService.wishListIds().length)
  cartItemsCount = computed<number>(() => {
    if (this.isLogged()) {
      return this.cartService.numOfCartItems()
    } else {
      return this.cartInLocalStorageService.cartList().length
    }
  })

  user = computed<Iuser>(() => this.authService.user())

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
    this.verifyToken()
    if (this.mystorageService.getUserObject()) {
      this.authService.user.set(JSON.parse(this.mystorageService.getUserObject()!))
    }

    this.getNumOfCartItems();
    this.getAllCategoriesData();
    this.getWishListItemsCount();
  }



  signOut() {
    this.authService.logOut()
  }

  closeDropdown(): void {
    const dropdown = document.getElementById('user-dropdown');
    const trigger = document.querySelector('[data-dropdown-toggle="user-dropdown"]') as HTMLElement;
    if (dropdown && trigger) {
      new Dropdown(dropdown, trigger).hide();
    }
  }



  getNumOfCartItems() {
    if (this.isLogged()) {
      this.cartService.getLoggedUserCart().subscribe({
        next: res => {
          this.cartService.numOfCartItems.set(res.numOfCartItems);
          if (res.data.products.length) {
            this.mystorageService.set('cartOwner', res.data.cartOwner)
          }
        }
      })
    } else {
      this.cartService.numOfCartItems.set(this.cartInLocalStorageService.cartList().length);
    }
  }


  getAllCategoriesData() {
    this.loadingCategories.set(true)
    this.categoriesService.getAllCategories().subscribe({
      next: res => {
        this.categoriesList.set(res.data)
        this.loadingCategories.set(false)
      },
      error: err => {
        this.loadingCategories.set(false)
      }
    })
  }


  getWishListItemsCount() {
    if (this.isLogged()) {
      this.wishListService.getLoggedUserWishlist().subscribe({
        next: res => {
          const wishList = signal<Iproduct[]>([])
          wishList.set(res.data)
          if (wishList().length) {
            this.wishListService.wishListIds.set(wishList().map((item) => item._id))

          }
        }
      })
    }else{
      this.wishListService.wishListIds.set(this.guestWishListService.getWishListIds())
    }

  }

  routeToSearch() {
    if (this.searchValue() === '') return
    this.router.navigate(['/search'], { queryParams: { q: this.searchValue() } })
    this.searchValue.set('')

  }

  verifyToken() {
    if (this.mystorageService.getToken()) {
      this.authService.verifyToken().subscribe()
    }
  }



}
