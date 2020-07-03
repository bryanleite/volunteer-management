import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Institution } from '../../domain/institution';
import { InstitutionService } from './institution.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { LocationService } from 'src/app/shared/locations/locations.service';
import { State } from 'src/app/domain/state';
import { City } from 'src/app/domain/city';

@Component({
    selector: 'app-institution',
    templateUrl: './institution.component.html',
    styleUrls: ['./institution.component.less']
})
export class InstitutionComponent implements OnInit {

    public formGroup: FormGroup;

    public states: State[] = [];
	public cities: City[] = [];

    constructor(private institutionService: InstitutionService,
                private _translateService: TranslateService,
                private locationService: LocationService,
                private _messageService: NzMessageService,
                private activatedRouter: ActivatedRoute,
				private router: Router) { 

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
        this.getStates();
        this.activatedRouter.params.subscribe(p => {
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
        this.institutionService.delete(id).subscribe(res => {
            this.showMessage('PAGES.INSTITUTION.SUCCESS_DELETE');
            this.router.navigate(['pages/institutions/list']);
        });
    }

    private showMessage(message: string) {
        this._translateService.get(message).subscribe(msg => {
            this._messageService.success(msg);
        });
    }

    getStates() {
		this.locationService.getAllStates().subscribe(states => {
			this.states = states;
			this.states.sort((a,b) => a.nome.localeCompare(b.nome));
		});
	}

	onSelectState(uf: string) {
		this.locationService.getCitiesByUF(uf).subscribe(cities => {
			this.cities = cities;
			this.cities.sort((a,b) => a.nome.localeCompare(b.nome));
		});
    }
    
    cancel() {
        this.router.navigate(['pages/institutions/list']);
    }
}
