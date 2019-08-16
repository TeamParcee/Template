import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor() { }
}

export class Plan {
  constructor(
    public id?: string,
    public date?: string,
    public startTime?: string,
    public uid?: string,
  ) { }
}
export class Activity {
  constructor(
    public id?: string,
    public name?: string,
    public date?: string,
    public startTime?: string
  ){}

}
