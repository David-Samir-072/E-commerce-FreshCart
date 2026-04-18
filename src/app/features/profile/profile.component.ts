import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterLinkActive, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [RouterOutlet, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent{

  activeTab=signal<'addresses'|'settings'>('addresses')



}
