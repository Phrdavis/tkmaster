import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet, RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { DialogModule } from 'primeng/dialog';
import { DrawerModule } from 'primeng/drawer';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';
import { TruncatePipe } from '../core/pipes/pipe.limiteTo';
import { TasksEdit } from '../pages/tasks/tasks-edit/tasks-edit';
import { EditorModule } from 'primeng/editor';
import { SelectModule } from 'primeng/select';

export const SHARED_UI_MODULES = [
    ButtonModule,
    InputTextModule,
    ToastModule,
    TableModule,
    CardModule,
    DialogModule,
    AvatarModule,
    TagModule,
    SkeletonModule,
    IconFieldModule,
    InputIconModule,
    TruncatePipe,
    TasksEdit,
    FormsModule,
    ReactiveFormsModule,
    FloatLabelModule,
    PasswordModule,
    RouterOutlet,
    DrawerModule, 
    RippleModule,
    RouterModule,
    EditorModule,
    SelectModule,
];