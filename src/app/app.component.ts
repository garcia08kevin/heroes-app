import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'heroesApp';
}

// export class AppComponent  implements OnInit{
//   title = 'heroesApp';

//   constructor(private authService:AuthService){}
//   ngOnInit(): void {
//     this.authService.checkAuth().subscribe( () =>{
//       console.log('autenticnacion')
//     })
//   }
// }
