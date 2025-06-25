package socc.socc_ufg.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import socc.socc_ufg.model.Disciplina;

import java.util.Optional;

public interface DisciplinaRepository extends JpaRepository<Disciplina, Long> {
    Optional<Disciplina> findByNome(String nomeDisciplina);
}
