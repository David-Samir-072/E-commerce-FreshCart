import { Routes } from '@angular/router';
import { authGuard } from './core/auth/guards/auth-guard';
import { isSignedGuard } from './core/auth/guards/is-signed-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
    title: 'FreshCart | Home',
  },
  {
    path: 'shop',
    loadComponent: () => import('./features/shop/shop.component').then((m) => m.ShopComponent),
    title: 'FreshCart | Shop',
  },
  {
    path: 'search',
    loadComponent: () => import('./features/search/search.component').then((m) => m.SearchComponent),
    title: 'FreshCart | search',
  },
  {
    path: 'categories',
    loadComponent: () =>
      import('./features/categories/categories.component').then((m) => m.CategoriesComponent),
    title: 'FreshCart | Categories',
  },
  {
    path: 'categories/:slug/:id',
    loadComponent: () =>
      import('./features/categories/categories.component').then((m) => m.CategoriesComponent),
    title: 'FreshCart | Categories',
  },
  {
    path: 'brands',
    loadComponent: () =>
      import('./features/brands/brands.component').then((m) => m.BrandsComponent),
    title: 'FreshCart | Brands',
  },
  {
    path: 'wishlist',
    loadComponent: () =>
      import('./features/wishlist/wishlist.component').then((m) => m.WishlistComponent),
    title: 'FreshCart | Wishlist',
  },
  {
    path: 'cart',
    loadComponent: () => import('./features/cart/cart.component').then((m) => m.CartComponent),
    title: 'FreshCart | Cart',
  },

  {
    path: 'details/:slug/:id',
    loadComponent: () =>
      import('./features/product-details/product-details.component').then(
        (m) => m.ProductDetailsComponent,
      ),
    title: 'FreshCart | Product Details',
  },

  {
    path: 'checkout',
    loadComponent: () =>
      import('./features/checkout/checkout.component').then((m) => m.CheckoutComponent),
    title: 'FreshCart | Checkout',
    canActivate: [authGuard]
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./features/forgot-password/forgot-password.component').then(
        (m) => m.ForgotPasswordComponent,
      ),
    title: 'FreshCart | Forgot Password',
  },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login.component').then((m) => m.LoginComponent),
    title: 'FreshCart | Login',
    canActivate: [isSignedGuard]
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/register/register.component').then((m) => m.RegisterComponent),
    title: 'FreshCart | Register',
    canActivate: [isSignedGuard]
  },
  {
    path: 'allorders',
    loadComponent: () =>
      import('./features/orders/orders.component').then((m) => m.OrdersComponent),
    title: 'FreshCart | Orders',
    canActivate: [authGuard]
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./features/product-search/product-search.component').then(
        (m) => m.ProductSearchComponent,
      ),
    title: 'FreshCart | Search',
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./features/profile/profile.component').then((m) => m.ProfileComponent),
    title: 'FreshCart | Profile',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo:'addresses',pathMatch:'full'
       },
      {
        path: 'addresses',
        loadComponent: () =>
        import('./features/profile/components/addresses/addresses.component').then((m) => m.AddressesComponent),

      },
      {
        path: 'profile-information',
        loadComponent: () =>
        import('./features/profile/components/profile-information/profile-information.component').then((m) => m.ProfileInformationComponent),

      },
      {
        path: 'change-password',
        loadComponent: () =>
        import('./features/profile/components/change-password/change-password.component').then((m) => m.ChangePasswordComponent),

      },
      
    ]
  },

  {
    path: '**',
    loadComponent: () =>
      import('./features/notfound/notfound.component').then((m) => m.NotfoundComponent),
    title: 'FreshCart | Page Not Found',
  },
];
