import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-video-component',
  templateUrl: './video-component.component.html',
  styleUrls: ['./video-component.component.scss']
})
export class VideoComponentComponent implements OnInit {
  @ViewChild('backgroundVideo') backgroundVideo!: ElementRef<HTMLVideoElement>;
  userInteracted: boolean =false;
  constructor() { }

  ngOnInit(): void {
  }
 // @ViewChild('videoPlayer') videoPlayer!: ElementRef;
 @ViewChild('textElement') textElement!: ElementRef; 
 //  ngAfterViewInit() { this.videoPlayer.nativeElement.play(); }
  showText() { this.textElement.nativeElement.style.display = 'block'; }




  onVideoLoaded(event: Event): void {
   const video = this.backgroundVideo.nativeElement;
   
   
   // If the user has interacted with the page, play the video
   if (this.userInteracted) {
     video.play().catch((err: any) => console.log('Play failed:', err));
    
   }
 }

 // Monitor video playback to loop between specific times
 

 // Listen for user interaction to trigger the video play
 @HostListener('window:click') onUserInteraction() {
   this.playVideo();
 }
 @HostListener('window:scroll') onUserScroll() {
   this.playVideo();
 }

 // Play video only after user interaction
 playVideo(): void {
   const video = this.backgroundVideo.nativeElement;
   this.userInteracted = true; // User has interacted with the page
   this.textElement.nativeElement.style.display = 'none';
   // Attempt to play the video once user interaction is detected
   if (video.paused) {
     video.play().catch((err: any) => console.log('Play failed:', err));
   }
 }
}
