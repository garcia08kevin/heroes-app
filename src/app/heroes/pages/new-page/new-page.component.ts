import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit {

  constructor(
    private heroService: HeroService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }
  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;
    this.activatedRoute.params.pipe(
      switchMap(({ id }) => this.heroService.getHeroById(id))
    ).subscribe((hero) => {
      if (!hero) return this.router.navigateByUrl('');

      this.heroForm.reset(hero);
      return;

      // const { id, superhero, publisher, alter_ego, first_appearance, characters, alt_img } = hero;
      // const heroPipe = new HeroImagePipe()
      // return this.heroForm.setValue({
      //   id: id,
      //   superhero: superhero,
      //   publisher: publisher,
      //   alter_ego: alter_ego,
      //   first_appearance: first_appearance,
      //   characters: characters,
      //   alt_img: heroPipe.transform(hero)
      // });
    })
  }

  public heroForm = new FormGroup({
    id: new FormControl(''),
    superhero: new FormControl('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl('')
  });

  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' }
  ]

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  onSubmit(): void {
    if (this.heroForm.invalid) return;

    if (this.currentHero.id) {
      this.heroService.updateHero(this.currentHero).subscribe(hero => {
        this.showSnackbar(`${hero.superhero} actualizado`)
      })
      return;
    }

    this.heroService.addHero(this.currentHero).subscribe(hero => {
      this.router.navigate(['/heroes/edit/', hero.id]);
      this.showSnackbar(`${hero.superhero} creado`)
    })
  }

  onDeleteHero() {
    if (!this.currentHero.id) throw Error('Hero id is required')

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value,
    });

    dialogRef.afterClosed().pipe(
      filter((result: boolean) => result),
      switchMap(() => this.heroService.deleteHeroById(this.currentHero.id)),
      filter((result:boolean) => result)
    ).subscribe(() => {
      this.router.navigate(['/heroes'])
    })
    // const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    //   data: this.heroForm.value,
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if(!result) return;
    //   this.heroService.deleteHeroById(this.currentHero.id).subscribe(result =>{
    //     this.router.navigate(['/heroes/list'])
    //   })
    // });
  }

  showSnackbar(message: string): void {
    this.snackBar.open(message, 'done', { duration: 2500, })
  }
}
