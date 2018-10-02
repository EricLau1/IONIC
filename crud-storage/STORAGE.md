IONIC STORAGE

	# sudo ionic start ionic-storage blank

	# cd ionic-storage

adicionar o storage ao package.json do projeto:

	# sudo npm install --save @ionic/storage

criar a página para edição de contatos:

	# sudo ionic g page edit-contato

criar o provider para gerenciar o storage:

	# sudo ionic g provider contato

fazer os imports no AppModule:

	import { IonicStorageModule } from '@ionic/storage';
	import { DatePipe } from '@angular/common';

	imports: [
		BrowserModule,
		IonicModule.forRoot(MyApp),
		IonicStorageModule.forRoot() // adicionado manualmente
	] 

criar os métodos de crud no provider contato.

criar os métodos no home.ts.

modificar o html no home.html.

criar os métodos no edit-contato.ts
