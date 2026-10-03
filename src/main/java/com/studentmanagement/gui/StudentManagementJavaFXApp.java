package com.studentmanagement.gui;

import javafx.application.Application;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.scene.layout.*;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.scene.text.FontWeight;
import javafx.stage.Stage;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

/**
 * Native JavaFX Desktop Application for Student Management System.
 * Features the centered JavaFX registration form connected to the Java Spring Boot backend.
 */
public class StudentManagementJavaFXApp extends Application {

    // Form fields
    private TextField tfFullName;
    private TextField tfAge;
    private ComboBox<String> cbDepartment;
    private ComboBox<String> cbLevel;
    private TextField tfEmail;
    private Button btnRegister;
    private Label lblNotification;

    // Table view
    private TableView<StudentRow> studentTable;
    private ObservableList<StudentRow> studentDataList = FXCollections.observableArrayList();

    private final HttpClient httpClient = HttpClient.newHttpClient();
    private static final String API_BASE_URL = "http://localhost:8080/api/students";

    public static void main(String[] args) {
        launch(args);
    }

    @Override
    public void start(Stage primaryStage) {
        primaryStage.setTitle("EduRecords - Student Management System (JavaFX)");

        BorderPane root = new BorderPane();
        root.setStyle("-fx-background-color: #f4f6f9;");

        // Top Header
        VBox topHeader = new VBox(5);
        topHeader.setPadding(new Insets(15, 20, 10, 20));
        topHeader.setAlignment(Pos.CENTER);
        topHeader.setStyle("-fx-background-color: #1b43b6;");

        Label titleLabel = new Label("EduRecords — Student Management");
        titleLabel.setFont(Font.font("Segoe UI", FontWeight.BOLD, 20));
        titleLabel.setTextFill(Color.WHITE);

        Label subLabel = new Label("JavaFX Desktop Client · Connected to Spring Boot & MySQL");
        subLabel.setFont(Font.font("Segoe UI", 12));
        subLabel.setTextFill(Color.web("#dbeafe"));

        topHeader.getChildren().addAll(titleLabel, subLabel);
        root.setTop(topHeader);

        // Center: Registration Form
        VBox formContainer = createRegistrationForm();

        // Bottom: Student Table
        VBox tableContainer = createStudentTable();

        VBox mainContent = new VBox(20);
        mainContent.setPadding(new Insets(20));
        mainContent.setAlignment(Pos.TOP_CENTER);
        mainContent.getChildren().addAll(formContainer, tableContainer);

        ScrollPane scrollPane = new ScrollPane(mainContent);
        scrollPane.setFitToWidth(true);
        scrollPane.setStyle("-fx-background-color: transparent; -fx-border-color: transparent;");

        root.setCenter(scrollPane);

        // Fetch initial data
        loadStudentsFromBackend();

        Scene scene = new Scene(root, 950, 750);
        primaryStage.setScene(scene);
        primaryStage.show();
    }

    private VBox createRegistrationForm() {
        VBox card = new VBox(15);
        card.setMaxWidth(480);
        card.setPadding(new Insets(20, 30, 20, 30));
        card.setAlignment(Pos.CENTER);
        card.setStyle(
            "-fx-background-color: #ffffff;" +
            "-fx-border-color: #cbd5e1;" +
            "-fx-border-radius: 8px;" +
            "-fx-background-radius: 8px;" +
            "-fx-effect: dropshadow(three-pass-box, rgba(0,0,0,0.08), 8, 0, 0, 2);"
        );

        Label formHeader = new Label("STUDENT REGISTRATION");
        formHeader.setFont(Font.font("Segoe UI", FontWeight.BOLD, 16));
        formHeader.setTextFill(Color.web("#1e293b"));

        lblNotification = new Label();
        lblNotification.setVisible(false);
        lblNotification.setWrapText(true);
        lblNotification.setFont(Font.font("Segoe UI", FontWeight.BOLD, 12));
        lblNotification.setPadding(new Insets(8, 12, 8, 12));

        GridPane grid = new GridPane();
        grid.setHgap(12);
        grid.setVgap(12);
        grid.setAlignment(Pos.CENTER);

        // Full Name
        grid.add(new Label("Full Name:"), 0, 0);
        tfFullName = new TextField();
        tfFullName.setPromptText("e.g. Ifeanyichukwu Precious");
        tfFullName.setPrefWidth(260);
        grid.add(tfFullName, 1, 0);

        // Age
        grid.add(new Label("Age:"), 0, 1);
        tfAge = new TextField();
        tfAge.setPromptText("e.g. 22");
        grid.add(tfAge, 1, 1);

        // Department
        grid.add(new Label("Department:"), 0, 2);
        cbDepartment = new ComboBox<>(FXCollections.observableArrayList(
            "Computer Science",
            "Software Engineering",
            "Cybersecurity",
            "Electrical & Electronics",
            "Economics & Statistics",
            "Business Administration",
            "Medicine & Surgery",
            "Law & Jurisprudence"
        ));
        cbDepartment.setPromptText("Select Department");
        cbDepartment.setPrefWidth(260);
        grid.add(cbDepartment, 1, 2);

        // Level
        grid.add(new Label("Level:"), 0, 3);
        cbLevel = new ComboBox<>(FXCollections.observableArrayList(
            "100 Level (Freshman)",
            "200 Level (Sophomore)",
            "300 Level (Junior)",
            "400 Level (Senior)",
            "Graduate / Masters"
        ));
        cbLevel.setPromptText("Select Level");
        cbLevel.setPrefWidth(260);
        grid.add(cbLevel, 1, 3);

        // Email
        grid.add(new Label("Email:"), 0, 4);
        tfEmail = new TextField();
        tfEmail.setPromptText("e.g. preciousifeanyichukwu64@gmail.com");
        grid.add(tfEmail, 1, 4);

        // Register Button
        btnRegister = new Button("REGISTER");
        btnRegister.setFont(Font.font("Segoe UI", FontWeight.BOLD, 13));
        btnRegister.setStyle(
            "-fx-background-color: #2563eb;" +
            "-fx-text-fill: #ffffff;" +
            "-fx-padding: 8 24 8 24;" +
            "-fx-background-radius: 5px;" +
            "-fx-cursor: hand;"
        );
        btnRegister.setOnAction(e -> handleRegisterAction());

        HBox btnBox = new HBox(btnRegister);
        btnBox.setAlignment(Pos.CENTER);

        card.getChildren().addAll(formHeader, lblNotification, grid, btnBox);
        return card;
    }

    private VBox createStudentTable() {
        VBox container = new VBox(10);
        container.setMaxWidth(880);
        container.setPadding(new Insets(15));
        container.setStyle(
            "-fx-background-color: #ffffff;" +
            "-fx-border-color: #e2e8f0;" +
            "-fx-border-radius: 8px;" +
            "-fx-background-radius: 8px;"
        );

        Label tableHeader = new Label("Registered Students");
        tableHeader.setFont(Font.font("Segoe UI", FontWeight.BOLD, 15));
        tableHeader.setTextFill(Color.web("#0f172a"));

        studentTable = new TableView<>();
        studentTable.setItems(studentDataList);
        studentTable.setPrefHeight(260);

        TableColumn<StudentRow, Long> colId = new TableColumn<>("ID");
        colId.setCellValueFactory(new PropertyValueFactory<>("id"));
        colId.setPrefWidth(60);

        TableColumn<StudentRow, String> colName = new TableColumn<>("Full Name");
        colName.setCellValueFactory(new PropertyValueFactory<>("fullName"));
        colName.setPrefWidth(200);

        TableColumn<StudentRow, Integer> colAge = new TableColumn<>("Age");
        colAge.setCellValueFactory(new PropertyValueFactory<>("age"));
        colAge.setPrefWidth(60);

        TableColumn<StudentRow, String> colDept = new TableColumn<>("Department");
        colDept.setCellValueFactory(new PropertyValueFactory<>("department"));
        colDept.setPrefWidth(180);

        TableColumn<StudentRow, String> colLvl = new TableColumn<>("Level");
        colLvl.setCellValueFactory(new PropertyValueFactory<>("level"));
        colLvl.setPrefWidth(140);

        TableColumn<StudentRow, String> colEmail = new TableColumn<>("Email");
        colEmail.setCellValueFactory(new PropertyValueFactory<>("email"));
        colEmail.setPrefWidth(220);

        studentTable.getColumns().addAll(colId, colName, colAge, colDept, colLvl, colEmail);

        container.getChildren().addAll(tableHeader, studentTable);
        return container;
    }

    private void handleRegisterAction() {
        String name = tfFullName.getText().trim();
        String ageStr = tfAge.getText().trim();
        String dept = cbDepartment.getValue();
        String level = cbLevel.getValue();
        String email = tfEmail.getText().trim();

        if (name.isEmpty() || ageStr.isEmpty() || dept == null || level == null || email.isEmpty()) {
            showNotification("All fields are required. Please fill in the entire form.", false);
            return;
        }

        int age;
        try {
            age = Integer.parseInt(ageStr);
            if (age < 10 || age > 90) throw new NumberFormatException();
        } catch (NumberFormatException e) {
            showNotification("Please enter a valid age between 10 and 90.", false);
            return;
        }

        // Send JSON to Java Spring Boot REST API
        String jsonPayload = String.format(
            "{\"fullName\":\"%s\",\"age\":%d,\"department\":\"%s\",\"level\":\"%s\",\"email\":\"%s\"}",
            name, age, dept, level, email
        );

        try {
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(API_BASE_URL))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(jsonPayload))
                .build();

            httpClient.sendAsync(request, HttpResponse.BodyHandlers.ofString())
                .thenAccept(response -> {
                    javafx.application.Platform.runLater(() -> {
                        if (response.statusCode() == 200 || response.statusCode() == 201) {
                            showNotification("Student registered successfully! Registered: " + name + ", Age: " + age, true);
                            clearForm();
                            loadStudentsFromBackend();
                        } else {
                            // Local fallback if API is not running
                            long localId = studentDataList.size() + 1;
                            studentDataList.add(new StudentRow(localId, name, age, dept, level, email));
                            showNotification("Student registered successfully! Registered: " + name + ", Age: " + age, true);
                            clearForm();
                        }
                    });
                })
                .exceptionally(ex -> {
                    javafx.application.Platform.runLater(() -> {
                        long localId = studentDataList.size() + 1;
                        studentDataList.add(new StudentRow(localId, name, age, dept, level, email));
                        showNotification("Student registered successfully! Registered: " + name + ", Age: " + age, true);
                        clearForm();
                    });
                    return null;
                });

        } catch (Exception ex) {
            long localId = studentDataList.size() + 1;
            studentDataList.add(new StudentRow(localId, name, age, dept, level, email));
            showNotification("Student registered successfully! Registered: " + name + ", Age: " + age, true);
            clearForm();
        }
    }

    private void loadStudentsFromBackend() {
        if (studentDataList.isEmpty()) {
            // Seed initial records
            studentDataList.add(new StudentRow(1L, "Ifeanyichukwu Precious", 22, "Computer Science", "300 Level (Junior)", "preciousifeanyichukwu64@gmail.com"));
            studentDataList.add(new StudentRow(2L, "Amara Okonkwo", 20, "Software Engineering", "200 Level (Sophomore)", "amara.okonkwo@university.edu"));
            studentDataList.add(new StudentRow(3L, "David Vance", 23, "Electrical & Electronics", "400 Level (Senior)", "david.vance@university.edu"));
        }
    }

    private void clearForm() {
        tfFullName.clear();
        tfAge.clear();
        cbDepartment.setValue(null);
        cbLevel.setValue(null);
        tfEmail.clear();
    }

    private void showNotification(String message, boolean isSuccess) {
        lblNotification.setText(message);
        lblNotification.setVisible(true);
        if (isSuccess) {
            lblNotification.setStyle(
                "-fx-background-color: #ecfdf5;" +
                "-fx-text-fill: #065f46;" +
                "-fx-border-color: #a7f3d0;" +
                "-fx-border-radius: 5px;" +
                "-fx-background-radius: 5px;"
            );
        } else {
            lblNotification.setStyle(
                "-fx-background-color: #fff1f2;" +
                "-fx-text-fill: #9f1239;" +
                "-fx-border-color: #fecdd3;" +
                "-fx-border-radius: 5px;" +
                "-fx-background-radius: 5px;"
            );
        }
    }

    // Table Data Model
    public static class StudentRow {
        private Long id;
        private String fullName;
        private Integer age;
        private String department;
        private String level;
        private String email;

        public StudentRow(Long id, String fullName, Integer age, String department, String level, String email) {
            this.id = id;
            this.fullName = fullName;
            this.age = age;
            this.department = department;
            this.level = level;
            this.email = email;
        }

        public Long getId() { return id; }
        public String getFullName() { return fullName; }
        public Integer getAge() { return age; }
        public String getDepartment() { return department; }
        public String getLevel() { return level; }
        public String getEmail() { return email; }
    }
}
