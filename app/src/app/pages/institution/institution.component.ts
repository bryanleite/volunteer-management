import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Institution } from '../../domain/institution';
import { InstitutionService } from './institution.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { LocationService } from 'src/app/shared/locations/locations.service';
import { State } from 'src/app/domain/state';
import { City } from 'src/app/domain/city';
import { StorageService } from 'src/app/shared/storage/storage.service';
import { VolunteerService } from '../volunteer/volunteer.service';
import { UsersService } from 'src/app/admin-settings/users/users.service';
import { Volunteer } from 'src/app/domain/volunteer';
import { User } from 'src/app/security/auth/user';
import { UserInformationsComponent } from 'src/app/user-informations/user-informations.component';
import { Skill } from 'src/app/domain/skill';

@Component({
    selector: 'app-institution',
    templateUrl: './institution.component.html',
    styleUrls: ['./institution.component.less']
})
export class InstitutionComponent implements OnInit {

    public formGroup: FormGroup;
    public managers: Volunteer[] = [];
    public volunteersSearch: Volunteer[];

    @ViewChild(UserInformationsComponent)
    private userInformations: UserInformationsComponent;
    public fgVs: FormGroup;
    public isModalVisible: boolean = false;

    public states: State[] = [];
	public cities: City[] = [];

    constructor(private institutionService: InstitutionService,
                private _translateService: TranslateService,
                private locationService: LocationService,
                private _messageService: NzMessageService,
                private storageService: StorageService,
                private activatedRouter: ActivatedRoute,
                private volunteerService: VolunteerService,
                private userService: UsersService,
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
        
        this.fgVs = new FormGroup({
			formalName: new FormControl(null)
		});
    }

    ngOnInit() {
        this.validCurrentUser();

        this.getStates();
        this.activatedRouter.params.subscribe(p => {
            if(p.id) {
                this.buildInstitutionbyId(p.id);
            }
        });
    }

    validCurrentUser() {
        let user = JSON.parse(this.storageService.getUser());
        if(!user || !user.admin) {
            this.router.navigate(['/forbidden']);
        }
    }

    buildInstitutionbyId(id: number) {
        this.institutionService.edit(id).subscribe((institution: Institution) => {
            this.buildForm(institution);

            this.volunteerService.getManagersByInstitutionId(id).subscribe(volunteers => {
                this.managers = volunteers;
            });
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
            this.buildInstitutionbyId(institution.id);
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

    makeVolunteerToManager(volunteer: Volunteer) {
        const institutionId = this.formGroup.get('id').value;
        this.userService.makeUserToManager(volunteer.userId, institutionId).subscribe(any => {
            this.volunteerService.getManagersByInstitutionId(institutionId).subscribe(volunteers => {
                this.managers = volunteers;
            });
            this.searchVolunteersByNameToMakeManager();
            this.showMessage('ALERTS.SAVE_SUCCESS');
        });
    }

    removerVolunteerInstitution(volunteer: Volunteer) {
        const institutionId = this.formGroup.get('id').value;
        this.userService.removerUserInstitution(volunteer.userId).subscribe(any => {
            this.showMessage('ALERTS.SAVE_SUCCESS');
            this.volunteerService.getManagersByInstitutionId(institutionId).subscribe(volunteers => {
                this.managers = volunteers;
            });
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

    showModal() {
		this.isModalVisible = true;
	}

	hideModal() {
		this.isModalVisible = false;
    }
    
    openUserInformations(userId: number) {
		this.userInformations.loadUserAndOpen(userId, false);
    }
    
    searchVolunteersByNameToMakeManager() {
        let formalName = this.fgVs.get('formalName') ? this.fgVs.get('formalName').value : undefined;
        
        this.volunteerService.getVolunteersByNameToMakeManager(formalName).subscribe(volunteers => {
            this.volunteersSearch = volunteers;
        });
    }
}
