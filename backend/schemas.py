# schemas.py
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date

# ---------- STUDENT ----------
class StudentBase(BaseModel):
    S_name: str
    S_Dept: str
    S_Address: str
    S_CGPA: float
    S_phoneNum: str
    companies_accepted: Optional[str] = None
    S_email: EmailStr
    attendance: float
    password: str
    S_year: int
    ReExam_Count: int
    Year_Back: bool


class StudentCreate(StudentBase):
    S_ID: str


class Student(StudentBase):
    S_ID: str

    class Config:
        orm_mode = True


# ---------- RESUME ----------
class ResumeBase(BaseModel):
    S_Ph_num: str
    S_email: EmailStr
    projects: Optional[str] = None
    s_exp: Optional[str] = None
    skills: Optional[str] = None
    s_education: Optional[str] = None
    s_description: Optional[str] = None
    certificates: Optional[str] = None
    achievements_and_position_of_responsibilities: Optional[str] = None


class ResumeCreate(ResumeBase):
    pass


class Resume(ResumeBase):
    class Config:
        orm_mode = True


# ---------- COMPANY ----------
class CompanyBase(BaseModel):
    C_Name: str
    C_Address: str
    Industry_Type: str
    C_website: Optional[str] = None
    C_phoneNum: str
    C_email: EmailStr
    branch: Optional[str] = None


class CompanyCreate(CompanyBase):
    C_ID: str


class Company(CompanyBase):
    C_ID: str

    class Config:
        orm_mode = True


# ---------- RECRUITMENT_DRIVE ----------
class RecruitmentDriveBase(BaseModel):
    LOCATION: str
    PACKAGE: str
    JOB_TITLE: str
    Drive_date: date
    Selection_process: str
    Description: Optional[str] = None
    Application_Deadline: date
    Work_type: str


class RecruitmentDriveCreate(RecruitmentDriveBase):
    DriveID: str


class RecruitmentDrive(RecruitmentDriveBase):
    DriveID: str

    class Config:
        orm_mode = True


# ---------- APPLICATION ----------
class ApplicationBase(BaseModel):
    ApplicationStatus: str
    round_number: int
    round_type: str


class ApplicationCreate(ApplicationBase):
    app_ID: str


class Application(ApplicationBase):
    app_ID: str

    class Config:
        orm_mode = True
