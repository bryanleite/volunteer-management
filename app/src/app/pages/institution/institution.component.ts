import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Institution } from '../../domain/institution';
import { InstitutionService } from './institution.service';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-institution',
    templateUrl: './institution.component.html',
    styleUrls: ['./institution.component.less']
})
export class InstitutionComponent implements OnInit {

    public formGroup: FormGroup;

    constructor(private builder: FormBuilder,
                private _activatedRouter: ActivatedRoute,
                private institutionService: InstitutionService,
                private _translateService: TranslateService,
                private _messageService: NzMessageService) { 

        this.formGroup = new FormGroup({
            id: new FormControl(null,),
            name: new FormControl(null, [Validators.required]),
            descri: new FormControl(null, [Validators.required]),
            cep: new FormControl(null, [Validators.required]),
            number: new FormControl(null, [Validators.required]),
            street: new FormControl(null, [Validators.required]),
            complement: new FormControl(null, [Validators.required]),
            city: new FormControl(null, [Validators.required]),
            state: new FormControl(null, [Validators.required])
        });
    }

    ngOnInit() {
        this._activatedRouter.params.subscribe(p => {
            if(p.id) {
                this.institutionService.edit(p.id).subscribe((institution: Institution) => {
                    this.buildForm(institution);
                });
            }
        });
    }

    private buildForm(institution: Institution) {
        Object.keys(this.formGroup.controls).forEach(control => {
            if(institution[control]) {
                this.formGroup.get(control).setValue(institution[control]);
            }
        });
    }

    public save() {
        const institution = new Institution();
        Object.keys(this.formGroup.controls).forEach(control => {
            institution[control] = this.formGroup.get(control).value;
        });

        this.institutionService.save(institution).subscribe(institution => {
            this.buildForm(institution);
           
            this.showMessage('PAGES.INSTITUTION.SUCCESS_SAVE');
        });
    }

    public delete() {
        const id = this.formGroup.get('id').value;
        this.institutionService.delete(id).subscribe(success => {
            if(success) {
                this.showMessage('PAGES.INSTITUTION.SUCCESS_DELETE');
            } else {
                this.showMessage('PAGES.INSTITUTION.FAIL_DELETE');
            }
        });
    }

    private showMessage(message: string) {
        this._translateService.get(message).subscribe(msg => {
            this._messageService.success(msg);
        });
    }
}
