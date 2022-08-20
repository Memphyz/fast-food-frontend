import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { noop } from 'rxjs';

const MEGA_BYTE: number = 1024;
const MAX_MB: number = 0.5;

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
  private maxSize = MEGA_BYTE * MAX_MB;
  private readonly fileReader = new FileReader();
  private onChange: (...args) => void = noop;
  private onTouched: (...args) => void = noop;

  constructor(private readonly toastr: ToastrService) {}

  public ngOnInit(): void {
    this.fileReader.onload = (data: ProgressEvent) => {
      this.writeValue((data.target as FileReader).result as string);
    }
  }

  public upload(file: File): void {
    if (file && file.size / MEGA_BYTE > this.maxSize) {
      this.toastr.error('Escolha uma imagem menor que 500 Kilobytes (KB)', 'Ops!')
      return undefined;
    }

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
