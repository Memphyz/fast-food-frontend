import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { noop } from 'rxjs';

@Component({
  selector: 'fast-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ImageUploaderComponent),
    multi: true
  }]
})
export class ImageUploaderComponent implements OnInit, ControlValueAccessor {

  public image: string;
  private file: File;
  private readonly fileReader = new FileReader();
  private onChange: (...args) => void = noop;
  private onTouched: (...args) => void = noop;

  public ngOnInit(): void {
    this.fileReader.onload = (data: ProgressEvent) => {
      this.writeValue((data.target as FileReader).result as string);
    }
  }

  public upload(file: File): void {
    this.file = file;
    this.file && this.fileReader.readAsDataURL(file);
    !this.file && !(this.image = undefined) && this.writeValue(undefined);
  }

  public writeValue(image: string): void {
    this.image = image;
    this.onTouched(image);
    this.onChange(image);
  }
  public registerOnChange(fn: (...args) => void): void {
    this.onChange = fn;
  }
  public registerOnTouched(fn: (...args) => void): void {
    this.onTouched = fn;
  }
}
