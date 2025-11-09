# routes.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from database import get_db  # You'll define this in main.py or database.py
from models import Student, Resume, Company, RecruitmentDrive, Application
from schemas import (
    StudentCreate, Student as StudentSchema,
    ResumeCreate, Resume as ResumeSchema,
    CompanyCreate, Company as CompanySchema,
    RecruitmentDriveCreate, RecruitmentDrive as RecruitmentDriveSchema,
    ApplicationCreate, Application as ApplicationSchema
)

router = APIRouter(prefix="/api", tags=["Placement Portal"])


# ---------- STUDENT ROUTES ----------
@router.post("/students/", response_model=StudentSchema, status_code=status.HTTP_201_CREATED)
def create_student(student: StudentCreate, db: Session = Depends(get_db)):
    existing_student = db.query(Student).filter(Student.S_ID == student.S_ID).first()
    if existing_student:
        raise HTTPException(status_code=400, detail="Student already exists")
    new_student = Student(**student.dict())
    db.add(new_student)
    db.commit()
    db.refresh(new_student)
    return new_student


@router.get("/students/{student_id}", response_model=StudentSchema)
def get_student(student_id: str, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.S_ID == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    return student


@router.get("/students/", response_model=List[StudentSchema])
def list_students(db: Session = Depends(get_db)):
    return db.query(Student).all()


# ---------- RESUME ROUTES ----------
@router.post("/resumes/{student_id}", response_model=ResumeSchema, status_code=status.HTTP_201_CREATED)
def create_resume(student_id: str, resume: ResumeCreate, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.S_ID == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    new_resume = Resume(S_ID=student_id, **resume.dict())
    db.add(new_resume)
    db.commit()
    db.refresh(new_resume)
    return new_resume


@router.get("/resumes/{student_id}", response_model=ResumeSchema)
def get_resume(student_id: str, db: Session = Depends(get_db)):
    resume = db.query(Resume).filter(Resume.S_ID == student_id).first()
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    return resume


# ---------- COMPANY ROUTES ----------
@router.post("/companies/", response_model=CompanySchema, status_code=status.HTTP_201_CREATED)
def create_company(company: CompanyCreate, db: Session = Depends(get_db)):
    existing_company = db.query(Company).filter(Company.C_ID == company.C_ID).first()
    if existing_company:
        raise HTTPException(status_code=400, detail="Company already exists")
    new_company = Company(**company.dict())
    db.add(new_company)
    db.commit()
    db.refresh(new_company)
    return new_company


@router.get("/companies/", response_model=List[CompanySchema])
def list_companies(db: Session = Depends(get_db)):
    return db.query(Company).all()


@router.get("/companies/{company_id}", response_model=CompanySchema)
def get_company(company_id: str, db: Session = Depends(get_db)):
    company = db.query(Company).filter(Company.C_ID == company_id).first()
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")
    return company


# ---------- RECRUITMENT DRIVE ROUTES ----------
@router.post("/drives/", response_model=RecruitmentDriveSchema, status_code=status.HTTP_201_CREATED)
def create_drive(drive: RecruitmentDriveCreate, db: Session = Depends(get_db)):
    existing_drive = db.query(RecruitmentDrive).filter(RecruitmentDrive.DriveID == drive.DriveID).first()
    if existing_drive:
        raise HTTPException(status_code=400, detail="Drive already exists")
    new_drive = RecruitmentDrive(**drive.dict())
    db.add(new_drive)
    db.commit()
    db.refresh(new_drive)
    return new_drive


@router.get("/drives/", response_model=List[RecruitmentDriveSchema])
def list_drives(db: Session = Depends(get_db)):
    return db.query(RecruitmentDrive).all()


@router.get("/drives/{drive_id}", response_model=RecruitmentDriveSchema)
def get_drive(drive_id: str, db: Session = Depends(get_db)):
    drive = db.query(RecruitmentDrive).filter(RecruitmentDrive.DriveID == drive_id).first()
    if not drive:
        raise HTTPException(status_code=404, detail="Drive not found")
    return drive


# ---------- APPLICATION ROUTES ----------
@router.post("/applications/", response_model=ApplicationSchema, status_code=status.HTTP_201_CREATED)
def create_application(application: ApplicationCreate, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.S_ID == application.S_ID).first()
    drive = db.query(RecruitmentDrive).filter(RecruitmentDrive.DriveID == application.DriveID).first()
    if not student or not drive:
        raise HTTPException(status_code=400, detail="Invalid Student ID or Drive ID")

    new_application = Application(**application.dict())
    db.add(new_application)
    db.commit()
    db.refresh(new_application)
    return new_application


@router.get("/applications/", response_model=List[ApplicationSchema])
def list_applications(db: Session = Depends(get_db)):
    return db.query(Application).all()


@router.get("/applications/{app_id}", response_model=ApplicationSchema)
def get_application(app_id: str, db: Session = Depends(get_db)):
    application = db.query(Application).filter(Application.app_ID == app_id).first()
    if not application:
        raise HTTPException(status_code=404, detail="Application not found")
    return application
