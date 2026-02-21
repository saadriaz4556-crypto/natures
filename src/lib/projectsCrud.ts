import { supabase } from './supabaseClient';

export interface Project {
    id: string;
    name: string;
    description?: string;
    created_at?: string;
}

/**
 * Custom Error class to handle API errors uniformly
 */
export class ProjectError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ProjectError';
    }
}

/**
 * CREATE a new project
 */
export async function createProject(projectData: Omit<Project, 'id' | 'created_at'>): Promise<Project> {
    const { data, error } = await supabase
        .from('projects')
        .insert([projectData])
        .select()
        .single();

    if (error) {
        console.error('Error creating project:', error);
        throw new ProjectError(error.message);
    }

    return data;
}

/**
 * READ all projects
 */
export async function getProjects(): Promise<Project[]> {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching projects:', error);
        throw new ProjectError(error.message);
    }

    return data || [];
}

/**
 * READ a single project by ID
 */
export async function getProjectById(id: string): Promise<Project | null> {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error(`Error fetching project with ID ${id}:`, error);
        throw new ProjectError(error.message);
    }

    return data;
}

/**
 * UPDATE an existing project
 */
export async function updateProject(id: string, updates: Partial<Project>): Promise<Project> {
    const { data, error } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error(`Error updating project with ID ${id}:`, error);
        throw new ProjectError(error.message);
    }

    return data;
}

/**
 * DELETE a project
 */
export async function deleteProject(id: string): Promise<void> {
    const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

    if (error) {
        console.error(`Error deleting project with ID ${id}:`, error);
        throw new ProjectError(error.message);
    }
}
