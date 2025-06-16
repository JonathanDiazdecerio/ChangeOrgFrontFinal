export interface FilePeticion {
  id?: number;
  name?: string;
  file_path: string;
  peticione_id?: number;
  created_at?: string;
  updated_at?: string;
}

export interface User {
  id?: number;
  name?: string;
  email?: string;
  role_id?: number;
}

export interface Categoria {
  id?: number;
  nombre?: string;
}
export interface Peticion {
  id?: number;
  titulo?: string;
  descripcion?: string;
  destinatario?: string;
  estado?: string;
  user_id?: number;      
  categoria_id?: number;  
  firmantes?: number;
  user?: User;
  categoria?: Categoria;
  file: FilePeticion;  
}
