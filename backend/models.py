from sqlalchemy import Column, String, Integer, Float, Boolean, Date, ForeignKey, Text
from sqlalchemy.orm import relationship, declarative_base

Base = declarative_base()


# STUDENT

class Student(Base):
    __tablename__ = "students"

    S_ID = Column(String, primary_key=True, index=True)
    S_name = Column(String, nullable=False)
    S_Dept = Column(String, nullable=False)
    S_Address = Column(Text, nullable=False)
    S_CGPA = Column(Float, nullable=False)
    S_phoneNum = Column(String, nullable=False)
    companies_accepted = Column(String)
    S_email = Column(String, unique=True, nullable=False)
    attendance = Column(Float, nullable=False)
    password = Column(String, nullable=False)
    S_year = Column(Integer, nullable=False)
    ReExam_Count = Column(Integer, nullable=False)
    Year_Back = Column(Boolean, nullable=False)

    # Relationships
    resume = relationship("Resume", back_populates="student", uselist=False, cascade="all, delete-orphan")
    applications = relationship("Application", back_populates="student", cascade="all, delete-orphan")



# RESUME (Weak Entity)

class Resume(Base):
    __tablename__ = "resumes"

    S_ID = Column(String, ForeignKey("students.S_ID"), primary_key=True)
    S_Ph_num = Column(String, nullable=False)
    S_email = Column(String, nullable=False)
    projects = Column(Text)
    s_exp = Column(Text)
    skills = Column(Text)
    s_education = Column(Text)
    s_description = Column(Text)
    certificates = Column(Text)
    achievements_and_position_of_responsibilities = Column(Text)

    # Relationships
    student = relationship("Student", back_populates="resume")



# COMPANY

class Company(Base):
    __tablename__ = "companies"

    C_ID = Column(String, primary_key=True, index=True)
    C_Name = Column(String, nullable=False)
    C_Address = Column(Text, nullable=False)
    Industry_Type = Column(String, nullable=False)
    C_website = Column(String)
    C_phoneNum = Column(String, nullable=False)
    C_email = Column(String, nullable=False)
    branch = Column(String)

    # Relationships
    drives = relationship("RecruitmentDrive", back_populates="company", cascade="all, delete-orphan")



# RECRUITMENT DRIVE

class RecruitmentDrive(Base):
    __tablename__ = "recruitment_drives"

    DriveID = Column(String, primary_key=True, index=True)
    LOCATION = Column(String, nullable=False)
    PACKAGE = Column(String, nullable=False)
    JOB_TITLE = Column(String, nullable=False)
    Drive_date = Column(Date, nullable=False)
    Selection_process = Column(String, nullable=False)
    Description = Column(Text)
    Application_Deadline = Column(Date, nullable=False)
    Work_type = Column(String, nullable=False)

    # Foreign Key to Company
    C_ID = Column(String, ForeignKey("companies.C_ID"), nullable=False)

    # Relationships
    company = relationship("Company", back_populates="drives")
    applications = relationship("Application", back_populates="drive", cascade="all, delete-orphan")



# APPLICATION

class Application(Base):
    __tablename__ = "applications"

    app_ID = Column(String, primary_key=True, index=True)
    ApplicationStatus = Column(String, nullable=False)
    round_number = Column(Integer, nullable=False)
    round_type = Column(String, nullable=False)

    # Foreign Keys
    S_ID = Column(String, ForeignKey("students.S_ID"), nullable=False)
    DriveID = Column(String, ForeignKey("recruitment_drives.DriveID"), nullable=False)

    # Relationships
    student = relationship("Student", back_populates="applications")
    drive = relationship("RecruitmentDrive", back_populates="applications")
