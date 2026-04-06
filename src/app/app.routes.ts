import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { DetailsCategoryComponent } from './features/details-category/details-category.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
    title: 'Home',
  },
  {
    path: 'shop',
    loadComponent: () => import('./features/shop/shop.component').then((m) => m.ShopComponent),
    title: 'Shop',
  },
  {
    path: 'categories',
    loadComponent: () =>
      import('./features/categories/categories.component').then((m) => m.CategoriesComponent),
    title: 'Categories',
  },
  {
    path: 'categories/:slug/:id',
   loadComponent: () =>
      import('./features/details-category/details-category.component').then(
        (m) => m.DetailsCategoryComponent,
      ),
    title: 'Categories',
  },
  {
    path: 'brands',
    loadComponent: () =>
      import('./features/brands/brands.component').then((m) => m.BrandsComponent),
    title: 'Brands',
  },
  {
    path: 'wishlist',
    loadComponent: () =>
      import('./features/wishlist/wishlist.component').then((m) => m.WishlistComponent),
    title: 'Wishlist',
  },
  {
    path: 'cart',
    loadComponent: () => import('./features/cart/cart.component').then((m) => m.CartComponent),
    title: 'Cart',
  },

  {
    path: 'details/:slug/:id',
    loadComponent: () =>
      import('./features/product-details/product-details.component').then(
        (m) => m.ProductDetailsComponent,
      ),
    title: 'Product Details',
  },

  {
    path: 'checkout',
    loadComponent: () =>
      import('./features/checkout/checkout.component').then((m) => m.CheckoutComponent),
    title: 'Checkout',
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./features/forgot-password/forgot-password.component').then(
        (m) => m.ForgotPasswordComponent,
      ),
    title: 'Forgot Password',
  },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login.component').then((m) => m.LoginComponent),
    title: 'Login',
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/register/register.component').then((m) => m.RegisterComponent),
    title: 'Register',
  },
  {
    path: 'orders',
    loadComponent: () =>
      import('./features/orders/orders.component').then((m) => m.OrdersComponent),
    title: 'Orders',
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./features/product-search/product-search.component').then(
        (m) => m.ProductSearchComponent,
      ),
    title: 'Search',
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./features/profile/profile.component').then((m) => m.ProfileComponent),
    title: 'Profile',
  },

  {
    path: '**',
    loadComponent: () =>
      import('./features/notfound/notfound.component').then((m) => m.NotfoundComponent),
    title: 'Page Not Found',
  },
];
