import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NzMessageService } from 'ng-zorro-antd';
import { Skill } from 'src/app/domain/skill';
import { SkillService } from 'src/app/pages/volunteer/skill.service';
import { User } from '../auth/user';
import { Volunteer } from 'src/app/domain/volunteer';
import { VolunteerSkill } from 'src/app/domain/volunteer-skill';
import { UsersService } from 'src/app/admin-settings/users/users.service';
import { VolunteerService } from 'src/app/pages/volunteer/volunteer.service';
import { AuthService } from '../auth/auth.service';
import { Login } from '../login/login';
import { Subscription, Observable } from 'rxjs';
import { State } from 'src/app/domain/state';
import { City } from 'src/app/domain/city';
import { LocationService } from 'src/app/shared/locations/locations.service';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit, OnDestroy {

	private _obsTrans$: Subscription;
	public skills: Skill[] = [];
	public currentStep: number = 0;

	public states: State[] = [];
	public cities: City[] = [];

	public fgUser: FormGroup;
	public fgVolunteer: FormGroup;
	public fgVolunteerSkills: FormGroup;

	constructor(private fb: FormBuilder,
		private _router: Router,
		private _translateService: TranslateService,
		private _messageService: NzMessageService,
		private _skillService: SkillService,
		private _userService: UsersService,
		private _volunteerService: VolunteerService,
		private _authService: AuthService,
		private locationService: LocationService) {

		this.fgUser = new FormGroup({
			username: new FormControl(null, [Validators.required]),
			password: new FormControl(null, [Validators.required]),
			confirmPassword: new FormControl(null, [Validators.required]),
			email: new FormControl(null, [Validators.required])
		});
		this.fgVolunteer = new FormGroup({
			formalName: new FormControl(null, [Validators.required]),
			birthDate: new FormControl(null, [Validators.required]),
			occupation: new FormControl(null),
			description: new FormControl(null),
			state: new FormControl(null, [Validators.required]),
			city: new FormControl(null, [Validators.required]),
			cep: new FormControl(null, [Validators.required])
		});
		this.fgVolunteerSkills = this.fb.group({
			values: this.fb.array([])
		});
		this.addVolunteerSkill();
	}

	ngOnInit() {
		this._obsTrans$ = this._skillService.findAll(true).subscribe((skills: Skill[]) => {
			this.skills = skills;
		});

		this.getStates();
	}

	addVolunteerSkill() {
		const fVolunteerSkills: FormArray = this.fgVolunteerSkills.get('values') as FormArray;
		fVolunteerSkills.push(
			this.fb.group({
				skillControl: new FormControl(null, [])
			})
		);
	}

	nextStep() {
		let formValid = true;
		if (this.currentStep == 0) {
			formValid = this.isValidUserInformations();
		}

		if (this.currentStep == 1) {
			formValid = this.isValidVolunteerInformations();
		}

		if (formValid && this.currentStep < 2) {
			this.currentStep = this.currentStep + 1;
		}
	}

	previousStep() {
		if (this.currentStep > 0) {
			this.currentStep = this.currentStep - 1;
		}
	}

	redirectToLogin() {
		this._router.navigate(['/login']);
	}

	isValidVolunteerInformations(): boolean {
		if (!this.fgVolunteer.valid) {
			this._translateService.get('SECURITY.SIGNUP.FIELDS_REQUIRED').subscribe(msg => {
				this._messageService.error(msg);
			});
		}
		return true;
	}

	isValidUserInformations(): boolean {
		if (!this.fgUser.valid) {
			return false;
		}

		const password = this.fgUser.get('password').value;
		const confirmPassword = this.fgUser.get('confirmPassword').value;
		if (password !== confirmPassword) {
			this._translateService.get('SECURITY.SIGNUP.PASSWORD_INVALID').subscribe(msg => {
				this._messageService.error(msg);
			});
			return false;
		}

		return true;
	}

	register() {
		if (!this.isValidUserInformations())
			return;

		if (!this.isValidVolunteerInformations())
			return;

		this._userService.createUser(this.getUserFromForm(), true).subscribe(user => {
			const volunteer = this.getVolunteerFromForm();
			setTimeout(() => {
				volunteer.user = user;
				this._volunteerService.save(volunteer, true).subscribe(v => {
					this._translateService.get('SECURITY.SIGNUP.REGISTER_SUCCESS').subscribe(msg => {
						this._messageService.success(msg);
					});
					
					const login: Login = new Login();
					login.username = user.username;
					login.password = user.password;
					
					this._authService.login(login).subscribe(
						(res) => {
							this._router.navigate(['/home']);
						}, (e) => {
							this._translateService.get('SECURITY.LOGIN.INVALID_CREDENTIALS').subscribe(msg => {
								this._messageService.error(msg);
							});
						});
					});
			},1000);
		})
	}

	getUserFromForm(): User {
		let user: User = new User();
		if (this.fgUser) {
			user.username = this.fgUser.get('username') ? this.fgUser.get('username').value : undefined;
			user.login = user.username;
			user.password = this.fgUser.get('password') ? this.fgUser.get('password').value : undefined;
			user.email = this.fgUser.get('email') ? this.fgUser.get('email').value : undefined;
		}

		return user;
	}

	getVolunteerFromForm(): Volunteer {
		let volunteer: Volunteer = new Volunteer();
		if (this.fgVolunteer) {
			volunteer.formalName = this.fgVolunteer.get('formalName') ? this.fgVolunteer.get('formalName').value : undefined;
			volunteer.birthDate = this.fgVolunteer.get('birthDate') ? this.fgVolunteer.get('birthDate').value : undefined;
			volunteer.occupation = this.fgVolunteer.get('occupation') ? this.fgVolunteer.get('occupation').value : undefined;
			volunteer.description = this.fgVolunteer.get('description') ? this.fgVolunteer.get('description').value : undefined;
			volunteer.state = this.fgVolunteer.get('state') ? this.fgVolunteer.get('state').value.sigla : undefined;
			volunteer.city = this.fgVolunteer.get('city') ? this.fgVolunteer.get('city').value.nome : undefined;
			volunteer.cep = this.fgVolunteer.get('cep') ? this.fgVolunteer.get('cep').value : undefined;
		}

		volunteer.volunteerSkills = this.getVolunteerSkillsFromForm();
		return volunteer;
	}

	getVolunteerSkillsFromForm(): VolunteerSkill[] {
		let volunteerSkills: VolunteerSkill[] = [];
		const formArrayValues: FormArray = this.fgVolunteerSkills.get('values') as FormArray;
		if (formArrayValues && formArrayValues.controls.length > 0) {

			formArrayValues.controls.forEach(value => {
				let skillAux: Skill;
				let skill = value && value.get('skillControl') ? value.get('skillControl').value : undefined;
				if (skill) {
					if (typeof (skill) === 'string') {
						skillAux = new Skill();
						skillAux.skillName = skill;
					} else {
						skillAux = skill;
					}
					const volunteerSkill: VolunteerSkill = new VolunteerSkill();
					volunteerSkill.skill = skillAux;
					volunteerSkills.push(volunteerSkill);
				}
			});

			// Save new skills
			if (volunteerSkills.length > 0) {
				for (let i = 0; i < volunteerSkills.length; i++) {
					const volunteerSkill = volunteerSkills[i];
					if (volunteerSkill && volunteerSkill.skill && !volunteerSkill.skill.id) {
						this._skillService.save(volunteerSkill.skill, true).subscribe(skill => {
							volunteerSkill.skill.id = skill.id;
						});
					}
				}
			}
			
		}
		return volunteerSkills;
	}

	getStates() {
		this.locationService.getAllStates().subscribe(states => {
			this.states = states;
			this.states.sort((a,b) => a.nome.localeCompare(b.nome));
		});
	}

	onSelectState(state: State) {
		this.locationService.getCitiesByUF(state.sigla).subscribe(cities => {
			this.cities = cities;
			this.cities.sort((a,b) => a.nome.localeCompare(b.nome));
		});
	}
	
	ngOnDestroy(): void {
		this._obsTrans$.unsubscribe();
	}
}
