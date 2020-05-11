import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { VolunteerSkill } from 'src/app/domain/volunteer-skill';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit {

	public fgUser: FormGroup;
	public fgVolunteer: FormGroup;
	public fgVolunteerSkills: FormGroup;

	constructor(private fb: FormBuilder,) {
		this.fgUser = new FormGroup({
			username: new FormControl(null, [Validators.required]),
			name: new FormControl(null, [Validators.required]),
			password: new FormControl(null, [Validators.required]),
			email: new FormControl(null, [Validators.required])
		});
		this.fgVolunteer = new FormGroup({
			formalName: new FormControl(null, [Validators.required]),
			birthDate: new FormControl(null, [Validators.required]),
			occupation: new FormControl(null, [Validators.required]),
			description: new FormControl(null, [Validators.required])
		});
		this.fgVolunteerSkills = this.fb.group({
			values: this.fb.array([])
		});
	}

	ngOnInit() {
	}

	addVolunteerSkill(volunteerSkill?: VolunteerSkill) {
		const fVolunteerSkills: FormArray = this.fgVolunteerSkills.get('values') as FormArray;
		const newVolunteerSkill: VolunteerSkill = volunteerSkill ? volunteerSkill : new VolunteerSkill();
		fVolunteerSkills.push(
			this.fb.group({
				id: new FormControl(newVolunteerSkill.id, []),
				destinyValue: new FormControl(newVolunteerSkill.skill, []),
			})
		);
	}

}
