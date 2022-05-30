import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
	selector: '[appNumberOnly]'
})
export class NumberOnlyDirective {

	@Input() numbersOnly: boolean | any;

	// navigationKeys: Array<string> = ['Backspace']; //Add keys as per requirement

	constructor(private _el: ElementRef) { }

	@HostListener('keydown', ['$event']) onKeyDown(e: KeyboardEvent) {

		if (
			// Allow: Delete, Backspace, Tab, Escape, Enter, etc
			(e.key === 'a' && e.ctrlKey === true) || // Allow: Ctrl+A
			(e.key === 'c' && e.ctrlKey === true) || // Allow: Ctrl+C
			(e.key === 'v' && e.ctrlKey === true) || // Allow: Ctrl+V
			(e.key === 'x' && e.ctrlKey === true) || // Allow: Ctrl+X
			(e.key === 'a' && e.metaKey === true) || // Cmd+A (Mac)
			(e.key === 'c' && e.metaKey === true) || // Cmd+C (Mac)
			(e.key === 'v' && e.metaKey === true) || // Cmd+V (Mac)
			(e.key === 'x' && e.metaKey === true) // Cmd+X (Mac)
		) {
			e.preventDefault();
			// return;  // let it happen, don't do anything
		}
		// Ensure that it is a number and stop the keypress
		// if (isNaN(Number(e.key))) {
		// 	e.preventDefault();
		// }

		const charCode = e.which ? e.which : e.keyCode;
		if (charCode > 31 && (charCode < 48 || charCode > 57)) {
			return false
		}
		return true
	}

}
