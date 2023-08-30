import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import {Subject, takeUntil} from "rxjs";

@Directive({
  selector: "[popoverTrigger]"
})
export class PopoverDirective {
  @Input()
  popoverTrigger!: TemplateRef<object>;

  /*private unsubscribe = new Subject();
  private overlayRef!: OverlayRef;

  constructor(
    private elementRef: ElementRef,
    private overlay: Overlay,
    private vcr: ViewContainerRef,
    private popoverService: PopoverService
  ) {}

  ngOnInit(): void {
    this.createOverlay();
  }


  private createOverlay(): void {
    const scrollStrategy = this.overlay.scrollStrategies.block();
    const positionStrategy = this.overlay.position().connectedTo(
      this.elementRef,
      new ConnectionPositionPair(
        { originX: "start", originY: "bottom" },
        { overlayX: "start", overlayY: "bottom" }
      ),
      new ConnectionPositionPair(
        { originX: "start", originY: "bottom" },
        { overlayX: "start", overlayY: "bottom" }
      )
    );

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy,
      hasBackdrop: true,
      backdropClass: ""
    });

    this.overlayRef
      .backdropClick()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.detachOverlay();
      });
  }

  ngOnDestroy(): void {
    this.detachOverlay();
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  private attachOverlay(): void {
    if (!this.overlayRef.hasAttached()) {
      const periodSelectorPortal = new TemplatePortal(
        this.popoverTrigger,
        this.vcr
      );

      this.overlayRef.attach(periodSelectorPortal);
    }
  }

  private detachOverlay(): void {
    if (this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }
  }


  @HostListener("click") clickou() {
    this.attachOverlay();
  }
*/
}
