import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../model/task.model';
import { Store } from '@ngrx/store';
import { TaskState } from '../store/todo/task.reducer';
import { addTask} from '../store/todo/task.action';
import { AudioRecorderService } from '../services/audio-recorder.service';
import { FileuploadService } from '../services/fileupload.service';

/**
 * npm i --save-dev @types/uuid
 */
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent implements OnInit{
  form!: FormGroup;
  priorities: string[] = ['Low', 'Medium' , 'High']; 
  editMode: boolean = false;
  editElemIdx : number = 0;
  isRecording = false;
  audioURL: string | null = null;
  audioBlob!: Blob;
  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;
  
  constructor(private fb: FormBuilder, private store: Store<TaskState>,
      private audioRecordingService: AudioRecorderService, 
      private cd: ChangeDetectorRef, private fileuploadSvc: FileuploadService){
    this.form = this.fb.group({
      task: ['', [Validators.required, Validators.minLength(3)]],
      priority: ['', Validators.required]
    })
  }

  ngOnInit(): void {
       this.audioRecordingService.audioBlob$.subscribe(blob => {
        this.audioBlob = blob;
        this.audioURL = window.URL.createObjectURL(blob);
        console.log(this.audioURL);
        this.audioPlayer.nativeElement.src = this.audioURL!;
        this.cd.detectChanges();
      });
  }

  startRecording() {
    this.isRecording = true;
    this.audioRecordingService.startRecording();
  }

  stopRecording() {
    this.isRecording = false;
    this.audioRecordingService.stopRecording();
  }

  addTodo(){
    console.log('Add todo');
    let desc = this.form.get('task')?.value;
    let priority = this.form.get('priority')?.value;
    
    const task: Task = {
      id: Math.floor(Math.random() * 100),
      title: desc,
      description: desc,
      priorty: priority,
      audiofile: this.audioBlob,
      status: 0
    };
    console.log('Adding new task');
    
    this.store.dispatch(addTask({task}));
    this.fileuploadSvc.upload(this.form.value, this.audioBlob).then((res) => {
      console.log('File uploaded successfully');
    });
  }

  updateTodo(){
    let desc = this.form.get('task')?.value;
    let priority = this.form.get('priority')?.value;
    //this.todos[this.editElemIdx].task = desc;
    //this.todos[this.editElemIdx].priority = priority;
    
  }

  cancelUpdateTodo(){
    this.editMode = false;
    this.form.reset();
  }

  // onEditTodo(todo: Todo){
  //   console.log(todo.taskId);
  //   this.editElemIdx = this.todos.indexOf(todo);
  //   console.log(this.editElemIdx);
  //   console.log(todo.priority);
  //   this.form.get('task')?.setValue(todo.task);  
  //   this.form.get('priority')?.setValue(todo.priority);

  //   this.editMode = true;
  // }

  dataURItoBlob(dataURI: String){
    var byteString = atob(dataURI.split(',')[1]);
    let mimeString = dataURI.split(',')[0].split(';')[0];
    var ab = new ArrayBuffer(byteString.length)
    var ia = new Uint8Array(ab)
    for(var i =0; i <byteString.length; i++){
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], {type: mimeString});
  }
}
