package com.trs_v1.taxpayer_registration_system_backend.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
public class Taxpayers {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(unique = true)
    private String tin;

    @NotBlank
    private String firstName;

    @NotBlank
    private String middleName;

    @NotBlank
    private String surname;

    @NotNull
    private String dateOfBirth;

    @NotBlank
    private String idType;

    @NotBlank
    private String idNumber;

    @NotBlank
    private String nationality;

    @NotBlank
    private String employmentStatus;

    private String spouseName;
    private String spouseTIN;

    @NotBlank
    private String residentialAddress;

    @NotBlank
    private String postalAddress;

    @NotBlank
    private String mobilePhone;

    @NotBlank
    @Email
    private String email;

    private String employerName;
    private String employerTIN;
    private LocalDate businessCommencementDate;
    private Integer numberOfEmployees;
    private Double estimatedAnnualTurnover;

    @NotBlank
    private String mainEconomicActivity;

    private String otherEconomicActivities;

    @NotBlank
    private String bankName;

    @NotBlank
    private String bankBranch;

    @NotBlank
    private String bankAccountNumber;

    //constructors
    public Taxpayers() {
    }

    //getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;  
    }

    public String getTin() {
        return tin;
    }

    public void setTin(String tin) {
        this.tin = tin;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getIdType() {
        return idType;
    }

    public void setIdType(String idType) {
        this.idType = idType;
    }

    public String getIdNumber() {
        return idNumber;
    }

    public void setIdNumber(String idNumber) {
        this.idNumber = idNumber;
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    public String getEmploymentStatus() {
        return employmentStatus;
    }

    public void setEmploymentStatus(String employmentStatus) {
        this.employmentStatus = employmentStatus;
    }

    public String getSpouseName() {
        return spouseName;
    }

    public void setSpouseName(String spouseName) {
        this.spouseName = spouseName;
    }

    public String getSpouseTIN() {
        return spouseTIN;
    }

    public void setSpouseTIN(String spouseTIN) {
        this.spouseTIN = spouseTIN;
    }

    public String getResidentialAddress() {
        return residentialAddress;
    }

    public void setResidentialAddress(String residentialAddress) {
        this.residentialAddress = residentialAddress;
    }

    public String getPostalAddress() {
        return postalAddress;
    }

    public void setPostalAddress(String postalAddress) {
        this.postalAddress = postalAddress;
    }

    public String getMobilePhone() {
        return mobilePhone;
    }

    public void setMobilePhone(String mobilePhone) {
        this.mobilePhone = mobilePhone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEmployerName() {
        return employerName;
    }

    public void setEmployerName(String employerName) {
        this.employerName = employerName;
    }

    public String getEmployerTIN() {
        return employerTIN;
    }

    public void setEmployerTIN(String employerTIN) {
        this.employerTIN = employerTIN;
    }

    public LocalDate getBusinessCommencementDate() {
        return businessCommencementDate;
    }

    public void setBusinessCommencementDate(LocalDate businessCommencementDate) {
        this.businessCommencementDate = businessCommencementDate;
    }

    public Integer getNumberOfEmployees() {
        return numberOfEmployees;
    }

    public void setNumberOfEmployees(Integer numberOfEmployees) {
        this.numberOfEmployees = numberOfEmployees;
    }

    public Double getEstimatedAnnualTurnover() {
        return estimatedAnnualTurnover;
    }

    public void setEstimatedAnnualTurnover(Double estimatedAnnualTurnover) {
        this.estimatedAnnualTurnover = estimatedAnnualTurnover;
    }

    public String getMainEconomicActivity() {
        return mainEconomicActivity;
    }

    public void setMainEconomicActivity(String mainEconomicActivity) {
        this.mainEconomicActivity = mainEconomicActivity;
    }

    public String getOtherEconomicActivities() {
        return otherEconomicActivities;
    }

    public void setOtherEconomicActivities(String otherEconomicActivities) {
        this.otherEconomicActivities = otherEconomicActivities;
    }

    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    public String getBankBranch() {
        return bankBranch;
    }

    public void setBankBranch(String bankBranch) {
        this.bankBranch = bankBranch;
    }

    public String getBankAccountNumber() {
        return bankAccountNumber;
    }

    public void setBankAccountNumber(String bankAccountNumber) {
        this.bankAccountNumber = bankAccountNumber;
    }
}
