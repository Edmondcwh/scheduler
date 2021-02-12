import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  me?: Maybe<User>;
  allProfessors?: Maybe<Array<Professor>>;
  allGroups?: Maybe<Array<Fypgroup>>;
  studentInfo: FypResponse;
  myProject: ProjectResponse;
  allProjects: Array<Project>;
  professorProjects: Array<Project>;
};


export type QueryMyProjectArgs = {
  groupname: Scalars['String'];
};


export type QueryProfessorProjectsArgs = {
  professor: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  role: Scalars['String'];
};

export type Professor = {
  __typename?: 'Professor';
  id: Scalars['Float'];
  name: Scalars['String'];
  unavailability?: Maybe<Array<Scalars['String']>>;
  supervise?: Maybe<Project>;
  examine?: Maybe<Project>;
};

export type Project = {
  __typename?: 'Project';
  id: Scalars['Float'];
  fypgroup: Fypgroup;
  title: Scalars['String'];
  superviser?: Maybe<Professor>;
  secondExaminer?: Maybe<Professor>;
  schedule?: Maybe<Scalars['String']>;
};

export type Fypgroup = {
  __typename?: 'Fypgroup';
  id: Scalars['Float'];
  name: Scalars['String'];
  students?: Maybe<Array<Scalars['String']>>;
  unavailability?: Maybe<Array<Scalars['String']>>;
};

export type FypResponse = {
  __typename?: 'FypResponse';
  errors?: Maybe<Scalars['String']>;
  groupname?: Maybe<Fypgroup>;
};

export type ProjectResponse = {
  __typename?: 'ProjectResponse';
  errors?: Maybe<Array<ProjectFieldError>>;
  project?: Maybe<Project>;
  message?: Maybe<Scalars['String']>;
};

export type ProjectFieldError = {
  __typename?: 'ProjectFieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  createProfessor: ProfessorResponse;
  updateProfessorUnavailability: ProfessorResponse;
  createFypGroup: FypResponse;
  updateGroupUnavailability: FypResponse;
  createProjects: ProjectResponse;
  updateSchedule: ProjectResponse;
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationCreateProfessorArgs = {
  professorName: Scalars['String'];
};


export type MutationUpdateProfessorUnavailabilityArgs = {
  unavailability: Array<Scalars['String']>;
};


export type MutationCreateFypGroupArgs = {
  fypgroupname: Scalars['String'];
};


export type MutationUpdateGroupUnavailabilityArgs = {
  unavailability: Array<Scalars['String']>;
};


export type MutationCreateProjectsArgs = {
  options: ProjectField;
};


export type MutationUpdateScheduleArgs = {
  schedule: Array<Scalars['String']>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type UsernamePasswordInput = {
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
};

export type ProfessorResponse = {
  __typename?: 'ProfessorResponse';
  errors?: Maybe<Scalars['String']>;
  professor?: Maybe<Professor>;
};

export type ProjectField = {
  groupname: Scalars['String'];
  title: Scalars['String'];
  supervisor: Scalars['String'];
  secondExaminer: Scalars['String'];
};

export type CreateFypGroupMutationVariables = Exact<{
  fypgroupname: Scalars['String'];
}>;


export type CreateFypGroupMutation = (
  { __typename?: 'Mutation' }
  & { createFypGroup: (
    { __typename?: 'FypResponse' }
    & Pick<FypResponse, 'errors'>
    & { groupname?: Maybe<(
      { __typename?: 'Fypgroup' }
      & Pick<Fypgroup, 'name'>
    )> }
  ) }
);

export type CreateProfessorMutationVariables = Exact<{
  professorName: Scalars['String'];
}>;


export type CreateProfessorMutation = (
  { __typename?: 'Mutation' }
  & { createProfessor: (
    { __typename?: 'ProfessorResponse' }
    & Pick<ProfessorResponse, 'errors'>
    & { professor?: Maybe<(
      { __typename?: 'Professor' }
      & Pick<Professor, 'name'>
    )> }
  ) }
);

export type CreateProjectMutationVariables = Exact<{
  groupname: Scalars['String'];
  supervisor: Scalars['String'];
  secondExaminer: Scalars['String'];
  title: Scalars['String'];
}>;


export type CreateProjectMutation = (
  { __typename?: 'Mutation' }
  & { createProjects: (
    { __typename?: 'ProjectResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'ProjectFieldError' }
      & Pick<ProjectFieldError, 'field' | 'message'>
    )>>, project?: Maybe<(
      { __typename?: 'Project' }
      & Pick<Project, 'title'>
      & { fypgroup: (
        { __typename?: 'Fypgroup' }
        & Pick<Fypgroup, 'name'>
      ), superviser?: Maybe<(
        { __typename?: 'Professor' }
        & Pick<Professor, 'name'>
      )>, secondExaminer?: Maybe<(
        { __typename?: 'Professor' }
        & Pick<Professor, 'name'>
      )> }
    )> }
  ) }
);

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'email' | 'role'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'email' | 'role'>
    )> }
  ) }
);

export type UpdateGroupUnavailabilityMutationVariables = Exact<{
  unavailability: Array<Scalars['String']> | Scalars['String'];
}>;


export type UpdateGroupUnavailabilityMutation = (
  { __typename?: 'Mutation' }
  & { updateGroupUnavailability: (
    { __typename?: 'FypResponse' }
    & Pick<FypResponse, 'errors'>
    & { groupname?: Maybe<(
      { __typename?: 'Fypgroup' }
      & Pick<Fypgroup, 'unavailability' | 'name'>
    )> }
  ) }
);

export type UpdateProfessorUnavailabilityMutationVariables = Exact<{
  unavailability: Array<Scalars['String']> | Scalars['String'];
}>;


export type UpdateProfessorUnavailabilityMutation = (
  { __typename?: 'Mutation' }
  & { updateProfessorUnavailability: (
    { __typename?: 'ProfessorResponse' }
    & Pick<ProfessorResponse, 'errors'>
    & { professor?: Maybe<(
      { __typename?: 'Professor' }
      & Pick<Professor, 'name' | 'unavailability'>
    )> }
  ) }
);

export type UpdateScheduleMutationVariables = Exact<{
  schedule: Array<Scalars['String']> | Scalars['String'];
}>;


export type UpdateScheduleMutation = (
  { __typename?: 'Mutation' }
  & { updateSchedule: (
    { __typename?: 'ProjectResponse' }
    & Pick<ProjectResponse, 'message'>
  ) }
);

export type AllGroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllGroupsQuery = (
  { __typename?: 'Query' }
  & { allGroups?: Maybe<Array<(
    { __typename?: 'Fypgroup' }
    & Pick<Fypgroup, 'name'>
  )>> }
);

export type AllProfessorsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllProfessorsQuery = (
  { __typename?: 'Query' }
  & { allProfessors?: Maybe<Array<(
    { __typename?: 'Professor' }
    & Pick<Professor, 'name'>
  )>> }
);

export type AllProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllProjectsQuery = (
  { __typename?: 'Query' }
  & { allProjects: Array<(
    { __typename?: 'Project' }
    & Pick<Project, 'title' | 'schedule'>
    & { fypgroup: (
      { __typename?: 'Fypgroup' }
      & Pick<Fypgroup, 'name' | 'unavailability'>
    ), superviser?: Maybe<(
      { __typename?: 'Professor' }
      & Pick<Professor, 'name' | 'unavailability'>
    )>, secondExaminer?: Maybe<(
      { __typename?: 'Professor' }
      & Pick<Professor, 'name' | 'unavailability'>
    )> }
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'email' | 'role'>
  )> }
);

export type MyProjectQueryVariables = Exact<{
  groupname: Scalars['String'];
}>;


export type MyProjectQuery = (
  { __typename?: 'Query' }
  & { myProject: (
    { __typename?: 'ProjectResponse' }
    & { project?: Maybe<(
      { __typename?: 'Project' }
      & Pick<Project, 'title' | 'schedule'>
      & { fypgroup: (
        { __typename?: 'Fypgroup' }
        & Pick<Fypgroup, 'name'>
      ), superviser?: Maybe<(
        { __typename?: 'Professor' }
        & Pick<Professor, 'name'>
      )>, secondExaminer?: Maybe<(
        { __typename?: 'Professor' }
        & Pick<Professor, 'name'>
      )> }
    )> }
  ) }
);

export type ProfessorProjectsQueryVariables = Exact<{
  professor: Scalars['String'];
}>;


export type ProfessorProjectsQuery = (
  { __typename?: 'Query' }
  & { professorProjects: Array<(
    { __typename?: 'Project' }
    & Pick<Project, 'title' | 'schedule'>
    & { fypgroup: (
      { __typename?: 'Fypgroup' }
      & Pick<Fypgroup, 'name' | 'unavailability'>
    ), superviser?: Maybe<(
      { __typename?: 'Professor' }
      & Pick<Professor, 'name'>
    )>, secondExaminer?: Maybe<(
      { __typename?: 'Professor' }
      & Pick<Professor, 'name'>
    )> }
  )> }
);

export type StudentUnQueryVariables = Exact<{ [key: string]: never; }>;


export type StudentUnQuery = (
  { __typename?: 'Query' }
  & { studentInfo: (
    { __typename?: 'FypResponse' }
    & { groupname?: Maybe<(
      { __typename?: 'Fypgroup' }
      & Pick<Fypgroup, 'name' | 'unavailability'>
    )> }
  ) }
);


export const CreateFypGroupDocument = gql`
    mutation createFypGroup($fypgroupname: String!) {
  createFypGroup(fypgroupname: $fypgroupname) {
    errors
    groupname {
      name
    }
  }
}
    `;

export function useCreateFypGroupMutation() {
  return Urql.useMutation<CreateFypGroupMutation, CreateFypGroupMutationVariables>(CreateFypGroupDocument);
};
export const CreateProfessorDocument = gql`
    mutation createProfessor($professorName: String!) {
  createProfessor(professorName: $professorName) {
    professor {
      name
    }
    errors
  }
}
    `;

export function useCreateProfessorMutation() {
  return Urql.useMutation<CreateProfessorMutation, CreateProfessorMutationVariables>(CreateProfessorDocument);
};
export const CreateProjectDocument = gql`
    mutation createProject($groupname: String!, $supervisor: String!, $secondExaminer: String!, $title: String!) {
  createProjects(
    options: {groupname: $groupname, supervisor: $supervisor, secondExaminer: $secondExaminer, title: $title}
  ) {
    errors {
      field
      message
    }
    project {
      fypgroup {
        name
      }
      title
      superviser {
        name
      }
      secondExaminer {
        name
      }
    }
  }
}
    `;

export function useCreateProjectMutation() {
  return Urql.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument);
};
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    user {
      id
      username
      email
      role
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($username: String!, $password: String!, $email: String!) {
  register(options: {username: $username, password: $password, email: $email}) {
    errors {
      field
      message
    }
    user {
      id
      username
      email
      role
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const UpdateGroupUnavailabilityDocument = gql`
    mutation updateGroupUnavailability($unavailability: [String!]!) {
  updateGroupUnavailability(unavailability: $unavailability) {
    errors
    groupname {
      unavailability
      name
    }
  }
}
    `;

export function useUpdateGroupUnavailabilityMutation() {
  return Urql.useMutation<UpdateGroupUnavailabilityMutation, UpdateGroupUnavailabilityMutationVariables>(UpdateGroupUnavailabilityDocument);
};
export const UpdateProfessorUnavailabilityDocument = gql`
    mutation updateProfessorUnavailability($unavailability: [String!]!) {
  updateProfessorUnavailability(unavailability: $unavailability) {
    errors
    professor {
      name
      unavailability
    }
  }
}
    `;

export function useUpdateProfessorUnavailabilityMutation() {
  return Urql.useMutation<UpdateProfessorUnavailabilityMutation, UpdateProfessorUnavailabilityMutationVariables>(UpdateProfessorUnavailabilityDocument);
};
export const UpdateScheduleDocument = gql`
    mutation updateSchedule($schedule: [String!]!) {
  updateSchedule(schedule: $schedule) {
    message
  }
}
    `;

export function useUpdateScheduleMutation() {
  return Urql.useMutation<UpdateScheduleMutation, UpdateScheduleMutationVariables>(UpdateScheduleDocument);
};
export const AllGroupsDocument = gql`
    query allGroups {
  allGroups {
    name
  }
}
    `;

export function useAllGroupsQuery(options: Omit<Urql.UseQueryArgs<AllGroupsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AllGroupsQuery>({ query: AllGroupsDocument, ...options });
};
export const AllProfessorsDocument = gql`
    query allProfessors {
  allProfessors {
    name
  }
}
    `;

export function useAllProfessorsQuery(options: Omit<Urql.UseQueryArgs<AllProfessorsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AllProfessorsQuery>({ query: AllProfessorsDocument, ...options });
};
export const AllProjectsDocument = gql`
    query allProjects {
  allProjects {
    fypgroup {
      name
      unavailability
    }
    title
    superviser {
      name
      unavailability
    }
    secondExaminer {
      name
      unavailability
    }
    schedule
  }
}
    `;

export function useAllProjectsQuery(options: Omit<Urql.UseQueryArgs<AllProjectsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AllProjectsQuery>({ query: AllProjectsDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    id
    username
    email
    role
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const MyProjectDocument = gql`
    query MyProject($groupname: String!) {
  myProject(groupname: $groupname) {
    project {
      title
      fypgroup {
        name
      }
      superviser {
        name
      }
      secondExaminer {
        name
      }
      schedule
    }
  }
}
    `;

export function useMyProjectQuery(options: Omit<Urql.UseQueryArgs<MyProjectQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MyProjectQuery>({ query: MyProjectDocument, ...options });
};
export const ProfessorProjectsDocument = gql`
    query ProfessorProjects($professor: String!) {
  professorProjects(professor: $professor) {
    title
    fypgroup {
      name
      unavailability
    }
    superviser {
      name
    }
    secondExaminer {
      name
    }
    schedule
  }
}
    `;

export function useProfessorProjectsQuery(options: Omit<Urql.UseQueryArgs<ProfessorProjectsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ProfessorProjectsQuery>({ query: ProfessorProjectsDocument, ...options });
};
export const StudentUnDocument = gql`
    query studentUn {
  studentInfo {
    groupname {
      name
      unavailability
    }
  }
}
    `;

export function useStudentUnQuery(options: Omit<Urql.UseQueryArgs<StudentUnQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<StudentUnQuery>({ query: StudentUnDocument, ...options });
};