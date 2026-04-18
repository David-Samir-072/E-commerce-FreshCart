import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customTimeAgo',
})
export class CustomTimeAgoPipe implements PipeTransform {
  transform(createdAt: string): string {

    const date = new Date(createdAt);
    const now: Date = new Date();
    const seconds: number = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return `Just now`;

    const minutes: number = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes>1?'s':''} ago`;

    const hours: number = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours>1?'s':''} ago`;

    const days: number = Math.floor(hours / 24);
    if (days < 30) return `${days} day${days>1?'s':''} ago`;

    const months = Math.floor(days / 30);

    if (months < 12) return `${months} month${months>1?'s':''} ago`;

    const years = Math.floor(months / 12);

    return `${years} year${years>1?'s':''} ago`;
  }
}
